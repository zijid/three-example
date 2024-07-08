uniform sampler2D texture;
uniform vec2 resolution;

varying vec3 vViewPosition;

varying vec3 vNormal;
void main(){
    
	// vec2 uv = gl_FragCoord.xy / resolution.xy;
	
	// vec4 color = texture2D(texture, uv);

	gl_FragColor = vec4(vNormal, 1.0);
	
	
	//gl_FragColor = vec4(uv, 0.0, 1.0);
}