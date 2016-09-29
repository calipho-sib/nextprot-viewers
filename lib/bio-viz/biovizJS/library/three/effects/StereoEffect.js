/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.StereoEffect = function(type, renderer, width, height) {
    var eyeRight = new THREE.Matrix4();
    var eyeLeft = new THREE.Matrix4();
    var _focal = 125;
    var _eyeSep = 0.5;
    var _aspect, _near, _far, _fov, _eyeSepRatio;

    var _cameraL = new THREE.PerspectiveCamera();
    _cameraL.matrixAutoUpdate = false;

    var _cameraR = new THREE.PerspectiveCamera();
    _cameraR.matrixAutoUpdate = false;

    var _scene = new THREE.Scene();

    var _camera = null;
    if (type === THREE.StereoEffect.Types.PARALLAX_BARRIER) {
        _camera = new THREE.PerspectiveCamera(53, 1, 1, 10000);
        _camera.position.z = 2;
        _scene.add(_camera);
    } else if (type === THREE.StereoEffect.Types.ANAGLYPH) {
        _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    }

    var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

    if (width === undefined) { width = 512; }
    if (height === undefined) { height = 512; }

    var _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
    var _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);

    var matUniforms = {
        'mapLeft': { type: 't', value: _renderTargetL },
        'mapRight': { type: 't', value: _renderTargetR }
    };

    var matVertexShader = [
        'varying vec2 vUv;',
        'void main() {',
        '   vUv = vec2( uv.x, uv.y );',
        '   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
    ].join('\n');

    var matFragmentShader = null;
    if (type === THREE.StereoEffect.Types.PARALLAX_BARRIER) {
        matFragmentShader = [
            'uniform sampler2D mapLeft;',
            'uniform sampler2D mapRight;',
            'varying vec2 vUv;',
            'void main() {',
            '   vec2 uv = vUv;',
            '   if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {',
            '       gl_FragColor = texture2D( mapLeft, uv );',
            '   } else {',
            '       gl_FragColor = texture2D( mapRight, uv );',
            '   }',
            '}'
        ].join('\n');
    } else if (type === THREE.StereoEffect.Types.ANAGLYPH) {
        matFragmentShader = [
            'uniform sampler2D mapLeft;',
            'uniform sampler2D mapRight;',
            'varying vec2 vUv;',
            'void main() {',
            '   vec4 colorL, colorR;',
            '   vec2 uv = vUv;',
            '   colorL = texture2D( mapLeft, uv );',
            '   colorR = texture2D( mapRight, uv );',
                // http://3dtv.at/Knowhow/AnaglyphComparison_en.aspx
            '   gl_FragColor = vec4( colorL.g * 0.7 + colorL.b * 0.3, colorR.g, colorR.b, colorL.a + colorR.a ) * 1.1;',
            '}'
        ].join('\n');
    }

    var _material = new THREE.ShaderMaterial({
        uniforms: matUniforms,
        vertexShader: matVertexShader,
        fragmentShader: matFragmentShader
    });

    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), _material);
    _scene.add(mesh);

    this.setSize = function(width, height) {
        if (_renderTargetL) { _renderTargetL.dispose(); }
        if (_renderTargetR) { _renderTargetR.dispose(); }

        _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
        _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);

        _material.uniforms['mapLeft'].value = _renderTargetL;
        _material.uniforms['mapRight'].value = _renderTargetR;

        renderer.setSize(width, height);
    };

    this.setSeparation = function(ratio) {
        _eyeSep = ratio;
    };

    /*
     * Renderer now uses an asymmetric perspective projection
     * (http://paulbourke.net/miscellaneous/stereographics/stereorender/).
     *
     * Each camera is offset by the eye seperation and its projection matrix is
     * also skewed asymetrically back to converge on the same projection plane.
     * Added a focal length parameter to, this is where the parallax is equal to 0.
     */

    this.render = function(scene, camera) {

        scene.updateMatrixWorld();

        if (camera.parent === undefined) { camera.updateMatrixWorld(); }

        var hasCameraChanged = (_aspect !== camera.aspect) || (_near !== camera.near) ||
                                (_far !== camera.far) || (_fov !== camera.fov) || (_eyeSep !== _eyeSepRatio);

        if (hasCameraChanged) {

            _aspect = camera.aspect;
            _near = camera.near;
            _far = camera.far;
            _fov = camera.fov;
            _eyeSepRatio = _eyeSep;

            var projectionMatrix = camera.projectionMatrix.clone();
            var eyeSep = _focal / 30 * _eyeSepRatio;
            var eyeSepOnProjection = eyeSep * _near / _focal;
            var ymax = _near * Math.tan(THREE.Math.degToRad(_fov * 0.5));
            var xmin, xmax;

            // translate xOffset

            eyeRight.elements[12] = eyeSep;
            eyeLeft.elements[12] = -eyeSep;

            // for left eye

            xmin = -ymax * _aspect + eyeSepOnProjection;
            xmax = ymax * _aspect + eyeSepOnProjection;

            projectionMatrix.elements[0] = 2 * _near / (xmax - xmin);
            projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);

            _cameraL.projectionMatrix.copy(projectionMatrix);

            // for right eye

            xmin = -ymax * _aspect - eyeSepOnProjection;
            xmax = ymax * _aspect - eyeSepOnProjection;

            projectionMatrix.elements[0] = 2 * _near / (xmax - xmin);
            projectionMatrix.elements[8] = (xmax + xmin) / (xmax - xmin);

            _cameraR.projectionMatrix.copy(projectionMatrix);

        }

        _cameraL.matrixWorld.copy(camera.matrixWorld).multiply(eyeLeft);
        _cameraL.position.copy(camera.position);
        _cameraL.near = camera.near;
        _cameraL.far = camera.far;

        renderer.render(scene, _cameraL, _renderTargetL, true);

        _cameraR.matrixWorld.copy(camera.matrixWorld).multiply(eyeRight);
        _cameraR.position.copy(camera.position);
        _cameraR.near = camera.near;
        _cameraR.far = camera.far;

        renderer.render(scene, _cameraR, _renderTargetR, true);

        _scene.updateMatrixWorld();

        renderer.render(_scene, _camera);

    };

    this.dispose = function() {
        if (_renderTargetL) { _renderTargetL.dispose(); }
        if (_renderTargetR) { _renderTargetR.dispose(); }
    };

};

THREE.StereoEffect.Types = {
    PARALLAX_BARRIER: 0,
    ANAGLYPH: 1
};
