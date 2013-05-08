// -- VERTEX --
varying vec2 vUV;

void main() {
	vUV = uv;
  	gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position,1.0);
}

##BREAK

// -- FRAGMENT --
varying vec2 vUV;
void main() {
  gl_FragColor = vec4(vec3(vUV, 0),
                      1); // A
}