import { VertexColors } from 'three'
const GlobeMap = {
  vertexColors: VertexColors,
  transparent: true,
  vertexShader: `			
    uniform float scale;
    uniform float size;
    
    varying vec2 vUv;
    varying vec3 vColor;
    
    void main() {
    
      vUv = uv;
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( scale / length( mvPosition.xyz )) * (0.3 + sin(uv.y * 3.1415926) * 0.6 );
      gl_Position = projectionMatrix * mvPosition;

    }
  `,
  fragmentShader: `
      uniform sampler2D visibility;
      uniform float shift;
      uniform sampler2D shape;
      
      varying vec2 vUv;
      varying vec3 vColor;
      

      void main() {
      	
        vec2 uv = vUv;
        uv.x += shift;
        vec4 v = texture2D(visibility, uv);
        if (length(v.rgb) > 1.0) discard;
        gl_FragColor = vec4( vColor, 0.5 );  
      }
  `,
}

export default GlobeMap
