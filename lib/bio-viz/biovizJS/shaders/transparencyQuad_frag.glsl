#include <packing>

varying vec2 vUv;

uniform sampler2D tOpaque;
uniform sampler2D tTransparent;
uniform sampler2D tOpaqueDepth;
uniform sampler2D tTransparentDepth;
uniform float cameraNear;
uniform float cameraFar;

float readDepth (sampler2D depthSampler, vec2 coord) {
  float cameraFarPlusNear = cameraFar + cameraNear;
  float cameraFarMinusNear = cameraFar - cameraNear;
  float cameraCoef = 2.0 * cameraNear;
  return cameraCoef / (cameraFarPlusNear - texture2D(depthSampler, coord).x * cameraFarMinusNear);
}

void main()
{
    vec4 opaque = texture2D( tOpaque, vUv );
    vec4 transparent = texture2D( tTransparent, vUv );

    float opaqueDepth = readDepth( tOpaqueDepth, vUv );
    float transparentDepth = readDepth( tTransparentDepth, vUv );

    if (opaqueDepth < transparentDepth) {
        gl_FragColor = opaque;
    } else {
        gl_FragColor = transparent + opaque * (1.0 - transparent.a);
    }
}
