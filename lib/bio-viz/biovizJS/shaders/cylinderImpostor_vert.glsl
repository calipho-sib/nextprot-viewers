// Inherits from Phong Shading in ThreeJS, allows compatibility with chunks
#define PHONG

// Normalize diagonal matrix (1)
const mat4 D = mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, 1.0, 0.0, 0.0),
    vec4(0.0, 0.0, 0.0, 0.0),
    vec4(0.0, 0.0, 0.0, -1.0)
);

const mat4 t1 = mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, 1.0, 0.0, 0.0),
    vec4(0.0, 0.0, 0.0, 0.0),
    vec4(0.0, 0.0, 1.0, 1.0)
);

const mat4 t2 = mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, 1.0, 0.0, 0.0),
    vec4(0.0, 0.0, 0.0, 0.0),
    vec4(0.0, 0.0, -1.0, 1.0)
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
attribute vec3 dir;

uniform vec4 viewport;
uniform mat4 modelViewMatrixInverse;

varying mat4 MTInverse;
varying mat4 VPInverse;
varying vec4 centernormclip;

// Near, far, width and height
varying float n, f, w, h;

// Compatibility with threejs chunks
varying vec3 vViewPosition;
varying vec3 vViewDirection;
varying float vLength;

vec4 ComputeBoundsFromPMT(mat4 PMT) {
    // Getting coefficients
    vec4 r1 = PMT[0];
    vec4 r2 = PMT[1];
    vec4 r4 = PMT[3];

    // Intermediate computations
    float r4TDr4 = dot(r4, D * r4);
    float r1TDr4 = dot(r1, D * r4);
    float r1TDr1 = dot(r1, D * r1);
    float r2TDr4 = dot(r2, D * r4);
    float r2TDr2 = dot(r2, D * r2);

    // Computing bounding box by resolving second degree equations (5)
    vec2 yBounds;
    vec2 xBounds;
    float A, B, C;
    A = r4TDr4; B = -2.0 * r1TDr4; C = r1TDr1;
    xBounds[0] = ( -B - sqrt( B * B - 4.0 * A * C ) ) / ( 2.0 * A );
    xBounds[1] = ( -B + sqrt( B * B - 4.0 * A * C ) ) / ( 2.0 * A );
    A = r4TDr4; B = - 2.0 * r2TDr4; C = r2TDr2;
    yBounds[0] = ( -B - sqrt( B * B - 4.0 * A * C ) ) / ( 2.0 * A );
    yBounds[1] = ( -B + sqrt( B * B - 4.0 * A * C ) ) / ( 2.0 * A );

    return vec4(xBounds, yBounds);
}

void main() {
    // Chunck to color vertex with vertex color attribute
    #include <color_vertex>

    // Chunck to compute position in world space
    #include <begin_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>

    vViewPosition = - mvPosition.xyz;

    float zScale = length(dir);
    vec3 normDir = normalize(dir);

    // Computing T matrix with u,v,w and c as quadratic surface parameters (2)
    // Note : ceil radius because low radius value seems to provoke precision errors
    mat4 Tscalet = mat4(
        vec4(ceil(radius), 0.0, 0.0,     0.0),
        vec4(0.0, ceil(radius), 0.0,     0.0),
        vec4(0.0, 0.0, zScale,   0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );

    // Finding up vector to compute rotation matrix from dir attribute
    vec3 up;
    bool yMain = abs(normDir[1]) > 0.9;
    if (yMain) {
    	up = vec3( 1, 0, 0 );
    } else {
    	up = vec3( 0, 1, 0 );
    }
    vec3 xAxis = normalize(cross(up, normDir.xyz));
    vec3 yAxis = normalize(cross(normDir.xyz, xAxis));

    mat4 Trott = mat4(
        vec4(xAxis.xyz,     0.0),
        vec4(yAxis.xyz,     0.0),
        vec4(normDir.xyz,   0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );

    mat4 Ttranst = mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(position.x,    position.y,    position.z,    1.0)
    );

    mat4 Tt = Ttranst * Trott * Tscalet;

    vViewDirection = vec3(modelViewMatrix * (Trott * (vec4(0.0, 0.0, 1.0, 0.0))));
    vLength = zScale;

    // Computing PMTt Matrix
    mat4 PMTt = transpose(projectionMatrix * modelViewMatrix * Tt * t1);

    vec4 firstBounds = ComputeBoundsFromPMT(PMTt);

    // Computing PMTt Matrix
    PMTt = transpose(projectionMatrix * modelViewMatrix * Tt * t2);

    vec4 secBounds = ComputeBoundsFromPMT(PMTt);

    vec2 vertBorders;
    vec2 horizBorders;
    horizBorders[0] = min(firstBounds[0], min(firstBounds[1], min(secBounds[0], secBounds[1])));
  	horizBorders[1] = max(firstBounds[0], max(firstBounds[1], max(secBounds[0], secBounds[1])));

  	vertBorders[1] = max(firstBounds[2], max(firstBounds[3], max(secBounds[2], secBounds[3])));
    vertBorders[0] = min(firstBounds[2], min(firstBounds[3], min(secBounds[2], secBounds[3])));

    // Getting bounding box size in window space
    float bx = abs( horizBorders[ 0 ] - horizBorders[ 1 ] ) * 0.5 * viewport.z;
    float by = abs( vertBorders[ 0 ] - vertBorders[ 1 ] ) * 0.5 * viewport.w;

    // Getting bounding box center in clip space
    float cx = 0.5 * (horizBorders.x + horizBorders.y);
    float cy = 0.5 * (vertBorders.x + vertBorders.y);

    // Setting point size
    gl_PointSize = ceil(max(bx, by));

    // Reposition vertex to fit with bounding box
    //gl_Position.xy = vec2(cx, cy) * gl_Position.w;

    // Prepare varyings for fragment shader
    mat4 TscaleInv = mat4(
        vec4(1.0 / radius,        0.0,           0.0,           0.0),
        vec4(0.0,           1.0 / radius,        0.0,           0.0),
        vec4(0.0,           0.0,           1.0 / zScale,        0.0),
        vec4(0.0,           0.0,           0.0,           1.0)
    );

    mat4 TrotInv = transpose(Trott);

    mat4 TtransInv = mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(-position, 1.0)
    );

    mat4 TInverse = TscaleInv * TrotInv * TtransInv;

    MTInverse = TInverse * modelViewMatrixInverse;

    // Getting near and far
    n = projectionMatrix[3][2] / (projectionMatrix[2][2] - 1.0);
    f = ((projectionMatrix[2][2] - 1.0) * n) / (projectionMatrix[2][2] + 1.0);

    // Getting width and height of the viewport for fragment
    w = viewport.z;
    h = viewport.w;
}
