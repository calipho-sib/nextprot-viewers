uniform float scale;

attribute float highlight;
attribute float radius;

varying float doHighlight;
varying float outputRadius;

void main() {
    outputRadius = radius;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 pNormal = projectionMatrix * vec4( normalMatrix * normal, 0.0 );
    vec2 xyNormal = pNormal.xy * scale;
    doHighlight = highlight;
    gl_Position = projectionMatrix * mvPosition + vec4( xyNormal, 0.15 , 0.0 );
}
