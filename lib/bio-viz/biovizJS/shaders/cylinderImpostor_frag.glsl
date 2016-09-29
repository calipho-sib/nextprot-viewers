// Inherits from Phong Shading in ThreeJS, allows compatibility with chunks
#define PHONG

#include <common>
#include <fog_pars_fragment>
#include <color_pars_fragment>
#include <lights_pars>
#include <bsdfs>
#include <lights_phong_pars_fragment>
#include <clipping_planes_pars_fragment>

// Normalize diagonal matrix (1)
const mat4 D = mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, 1.0, 0.0, 0.0),
    vec4(0.0, 0.0, 0.0, 0.0),
    vec4(0.0, 0.0, 0.0, -1.0)
);

// Create transpose method (not built-in OpenGL ES Shading Language)
highp mat4 transpose(in highp mat4 inMatrix) {
    highp vec4 i0 = inMatrix[0];
    highp vec4 i1 = inMatrix[1];
    highp vec4 i2 = inMatrix[2];
    highp vec4 i3 = inMatrix[3];

    highp mat4 outMatrix = mat4(
        vec4(i0.x, i1.x, i2.x, i3.x),
        vec4(i0.y, i1.y, i2.y, i3.y),
        vec4(i0.z, i1.z, i2.z, i3.z),
        vec4(i0.w, i1.w, i2.w, i3.w)
    );

    return outMatrix;
}

varying mat4 MTInverse;
varying mat4 VPInverse;
varying vec4 centernormclip;

// Near, far, width and height
varying float n, f, w, h;

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
uniform mat4 projectionMatrix;
uniform mat4 projectionMatrixInverse;

varying vec3 vViewDirection;
varying float vLength;

void main() {
    gl_FragColor = vec4(1.0);
    float c = (f - n) / (2.0 * n * f) * 2.0 / (gl_DepthRange.diff);
    vec4 c3 = MTInverse[3] * c;

    // Computing xprime (6)
    vec4 xp = vec4(
        (gl_FragCoord.x * 2.0 / w - 1.0),
        (gl_FragCoord.y * 2.0 / h - 1.0),
        -1.0,
        1.0
    );
    xp = projectionMatrixInverse * xp;
    xp.z = -1.0;
    xp.w = (f + n) / (2.0 * f * n) - (n - f) /
        (2.0 * f * n) * (gl_DepthRange.near + gl_DepthRange.far) / -gl_DepthRange.diff;
    vec4 xpPrime = MTInverse * xp;

    // Checking quadratic equation discriminant (7)
    float c3TDc3 = dot(c3, D * c3);
    float xpPrimeTDc3 = dot(xpPrime, D * c3);
    float xpPrimeTDxpPrime = dot(xpPrime, D * xpPrime);
    float A = c3TDc3, B = 2.0 * xpPrimeTDc3, C = xpPrimeTDxpPrime;
    float discriminant = B * B - 4.0 * A * C;

    gl_FragColor = vec4(1.0);
    if (discriminant < 0.0) {
        discard;
    } else {
        // Resolving solutions
        float x1 = (-B - sqrt(discriminant)) / (2.0 * A);
        float x2 = (-B + sqrt(discriminant)) / (2.0 * A);
        float z = 1.0 - max(x1, x2);
        gl_FragDepthEXT = z;

        // Getting current pixel clip coordinate
        vec4 vClipPos = vec4(
            (gl_FragCoord.x * 2.0 - 1.0),
            (gl_FragCoord.y * 2.0 - 1.0),
            z * 2.0 - 1.0,
            1.0
        );

        // Getting current pixel in NDC
        vec3 fc = vec3(gl_FragCoord.xy, z);
        fc.xy /= vec2(w, h);
        fc *= 2.0;
        fc -= 1.0;
        // Getting current pixel in view coordinates
        vec4 p = projectionMatrixInverse * vec4(fc, 1.0);
        p /= p.w;

        vec3 cylBase = p.xyz + vViewPosition.xyz;

        float a = dot(cylBase,vViewDirection);
        if (a < 0.0 || a > vLength + 0.000001) {
        	discard;
        }

        // Computing current pixel position in eye space
        vec4 vViewPos = projectionMatrixInverse * vClipPos;
        vViewPos = vViewPos / vViewPos.w;
        vViewPos.z = - vViewPos.z;

        // Performing clipping
        #if NUM_CLIPPING_PLANES > 0
        for ( int i = 0; i < NUM_CLIPPING_PLANES; ++ i ) {
            vec4 plane = clippingPlanes[ i ];
            if ( dot(vViewPos.xyz, plane.xyz ) > plane.w ) {
                discard;
            }
        }
        #endif

        // Position in eye coordinates (8)
        vec4 pe = vec4(
            (gl_FragCoord.x * 2.0 / w - 1.0),
            (gl_FragCoord.y * 2.0 / h - 1.0),
            -1.0,
            1.0
        );
        pe = projectionMatrixInverse * pe;
        pe.z = -1.0;
        pe.w = (f + n)/(2.0 * f * n) -
            (n - f)/(2.0 * f * n) * (gl_DepthRange.near + gl_DepthRange.far) / gl_DepthRange.diff +
            z * ((n - f) / (n * f) / gl_DepthRange.diff);
        vec4 np = MTInverse * pe;
        // Because the cylinder's axis is Z, we ignore z value of the vertex
        np.z = 0.0;
        vec4 ne = transpose(MTInverse) * np;

        // Declaring normal to get compatibility with threejs Phong chunks
        vec3 normal = normalize(ne.xyz);

        // Starting to compute phong lighting
        vec4 diffuseColor = vec4(diffuse, opacity);
        ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
        vec3 totalEmissiveLight = emissive;
        #include <color_fragment>
        // Declaring specularStength to get compatibility with threejs chunks
        float specularStrength = 1.0;
        #include <lights_phong_fragment>
        #include <lights_template>
        vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
                                reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveLight;

        gl_FragColor = vec4(outgoingLight, opacity);

        #include <fog_fragment>
    }
}
