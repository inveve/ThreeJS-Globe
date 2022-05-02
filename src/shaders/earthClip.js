import { VertexColors } from 'three'

const earthClip = (window, alpha) => ({
  vertexColors: VertexColors,
  uniforms: {
    visibility: {
      value: alpha,
    },
    shift: {
      value: 0,
    },
    size: {
      value: 0.15,
    },
    scale: {
      value: 100,
    },
  },
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

        gl_FragColor = vec4( vColor, 1.0 );
        
        // maps texture into the point
        // vec4 shapeData = texture2D( shape, gl_PointCoord );
        //if (shapeData.a < 0.0625) discard;
        //gl_FragColor = gl_FragColor * shapeData;
    
      }
  `,
  transparent: false,
})

export default earthClip
