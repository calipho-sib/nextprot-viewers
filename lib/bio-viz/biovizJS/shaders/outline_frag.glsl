uniform vec3 color;

varying float doHighlight;
varying float outputRadius;

void main() {
    if (doHighlight > 0.99) {
        gl_FragColor = vec4( color, 1.0 );
        /*gl_FragColor = vec4(vec3(outputRadius), 1.0 );*/
    } else {
        discard;
    }
}
