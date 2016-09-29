/**
 * @author mrdoob / http://mrdoob.com/
 * @author marklundin / http://mark-lundin.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.ParallaxBarrierEffect = function ( renderer ) {

	var _camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

	var _scene = new THREE.Scene();

	var _stereo = new THREE.StereoCamera();

	var _params = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };

	var _renderTargetL = new THREE.WebGLRenderTarget( 512, 512, _params );
	var _renderTargetR = new THREE.WebGLRenderTarget( 512, 512, _params );

	var _material = new THREE.ShaderMaterial( {

		uniforms: {

			"mapLeft": { value: _renderTargetL.texture },
			"mapRight": { value: _renderTargetR.texture }

		},

		vertexShader: [

			"varying vec2 vUv;",

			"void main() {",

			"	vUv = vec2( uv.x, uv.y );",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

			"}"

		].join( "\n" ),

		fragmentShader: [

			"uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;",
			"varying vec2 vUv;",

			"void main() {",

			"	vec2 uv = vUv;",

			"	if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {",

			"		gl_FragColor = texture2D( mapLeft, uv );",

			"	} else {",

			"		gl_FragColor = texture2D( mapRight, uv );",

			"	}",

			"}"

		].join( "\n" )

	} );

	var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), _material );
	_scene.add( mesh );

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );

		var pixelRatio = renderer.getPixelRatio();

		_renderTargetL.setSize( width * pixelRatio, height * pixelRatio );
		_renderTargetR.setSize( width * pixelRatio, height * pixelRatio );

	};

	this.render = function ( scene, camera ) {

		scene.updateMatrixWorld();

		if ( camera.parent === null ) camera.updateMatrixWorld();

		_stereo.update( camera );

        this.updateUniforms(scene, _stereo.cameraL);
		renderer.render( scene, _stereo.cameraL, _renderTargetL, true );
        this.updateUniforms(scene, _stereo.cameraR);
		renderer.render( scene, _stereo.cameraR, _renderTargetR, true );
		renderer.render( _scene, _camera );

	};

    this.updateUniforms = function(group, camera) {
        var projectionMatrixInverse = new THREE.Matrix4();
        var modelViewMatrixInverse = new THREE.Matrix4();

        var viewport = new THREE.Vector4(0.0, 0.0,
                                        renderer.domElement.offsetWidth, renderer.domElement.offsetHeight);

        // TODO : ThreeJS already update it at WebGLRenderer@render, but we need it to compute modelViewMatrixInverse
        camera.updateMatrixWorld();
        camera.matrixWorldInverse.getInverse(camera.matrixWorld);

        projectionMatrixInverse.getInverse(
            camera.projectionMatrix
        );

        group.traverse(function(o) {
            if (!o.material) { return; }

            var u = o.material.uniforms;
            var multiMat = o.material.materials;
            if (!u && !multiMat) { return; }

            if (u) {
                multiMat = [o.material];
            }
            for (var i = 0; i < multiMat.length; i++) {
                u = multiMat[i].uniforms;

                if (u.projectionMatrixInverse) {
                    u.projectionMatrixInverse.value = projectionMatrixInverse;
                }

                if (u.modelViewMatrixInverse) {
                    var matrix = new THREE.Matrix4().multiplyMatrices(camera.matrixWorldInverse, o.matrixWorld);
                    modelViewMatrixInverse.getInverse(
                        matrix
                    );
                    u.modelViewMatrixInverse.value = modelViewMatrixInverse;
                }

                if (u.viewport) {
                    u.viewport.value = viewport;
                }
            }
        });
    }
};
