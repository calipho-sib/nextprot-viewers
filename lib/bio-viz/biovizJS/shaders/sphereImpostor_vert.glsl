// Inherits from Phong Shading in ThreeJS, allows compatibility with chunks
#define PHONG

// Normalize diagonal matrix (1)
const mat4 D = mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, 1.0, 0.0, 0.0),
    vec4(0.0, 0.0, 1.0, 0.0),
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

#include <common>
#include <color_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

attribute float radius;

uniform vec4 viewport;
uniform mat4 modelViewMatrixInverse;

varying mat4 MTInverse;
varying mat4 VPInverse;
varying vec4 centernormclip;

// Near, far, width and height
varying float n, f, w, h;

// Compatibility with threejs chunks
varying vec3 vViewPosition;

void main() {
    // Chunck to color vertex with vertex color attribute
    #include <color_vertex>

    // Chunck to compute position in world space
    #include <begin_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>

    vViewPosition = - mvPosition.xyz;

    // Computing T matrix with u,v,w and c as quadratic surface parameters (2)
    mat4 T = mat4(
        // Three following vectors represents u, v, w axis of the quadric
        vec4(radius,        0.0,           0.0,           0.0),
        vec4(0.0,           radius,        0.0,           0.0),
        vec4(0.0,           0.0,           radius,        0.0),
        // Represents c, center of the quadric
        vec4(position.x,    position.y,    position.z,    1.0)
    );

    // Computing PMTt Matrix
    mat4 PMTt = transpose(projectionMatrix * modelViewMatrix * T);

    // Getting coefficients
    vec4 r1 = PMTt[0];
    vec4 r2 = PMTt[1];
    vec4 r4 = PMTt[3];

    // Intermediate computations
    float r4TDr4 = dot(r4, D * r4);
    float r1TDr4 = dot(r1, D * r4);
    float r1TDr1 = dot(r1, D * r1);
    float r2TDr4 = dot(r2, D * r4);
    float r2TDr2 = dot(r2, D * r2);

    // Computing bounding box by resolving second degree equations (5)
    vec2 vertBorders;
    vec2 horizBorders;
    float A, B, C;
    A = r4TDr4; B = -2.0 * r1TDr4; C = r1TDr1;
    horizBorders[0] = ( -B - sqrt( B * B - 4.0 * A * C ) ) / ( 2.0 * A );
    horizBorders[1] = ( -B + sqrt( B * B - 4.0 * A * C ) ) / ( 2.0 * A );
    A = r4TDr4; B = - 2.0 * r2TDr4; C = r2TDr2;
    vertBorders[0] = ( -B - sqrt( B * B - 4.0 * A * C ) ) / ( 2.0 * A );
    vertBorders[1] = ( -B + sqrt( B * B - 4.0 * A * C ) ) / ( 2.0 * A );

    // Getting bounding box size in window space
    float bx = abs( horizBorders[ 0 ] - horizBorders[ 1 ] ) * viewport.z;
    float by = abs( vertBorders[ 0 ] - vertBorders[ 1 ] ) * viewport.w;

    // Getting bounding box center in clip space
    float cx = 0.5 * (horizBorders.x + horizBorders.y);
    float cy = 0.5 * (vertBorders.x + vertBorders.y);

    // Setting point size
    gl_PointSize = max(bx, by) * 0.5;

    // Reposition vertex to fit with bounding box
    gl_Position.xy = vec2(cx, cy) * gl_Position.w;

    // Prepare varyings for fragment shader
    mat4 TInverse = mat4(
        1.0,          0.0,          0.0,         0.0,
        0.0,          1.0,          0.0,         0.0,
        0.0,          0.0,          1.0,         0.0,
        -position.x,  -position.y,  -position.z, radius
    );
    MTInverse = TInverse * modelViewMatrixInverse;

    // Getting near and far
    n = projectionMatrix[3][2] / (projectionMatrix[2][2] - 1.0);
    f = ((projectionMatrix[2][2] - 1.0) * n) / (projectionMatrix[2][2] + 1.0);

    // Getting width and height of the viewport for fragment
    w = viewport.z;
    h = viewport.w;
}
