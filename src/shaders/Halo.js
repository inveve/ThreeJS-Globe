import { BackSide, AdditiveBlending } from 'three'

const halo = {
  vertexShader: ` 
  varying vec3 vNormal;
  void main() {
    vNormal = normalize( normalMatrix * normal );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying vec3 vNormal;
    void main() {
      float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 9.0 );
      gl_FragColor = vec4(mix(uColor, uColor, vNormal.y), 1.0) * intensity * 0.8;
    }
   
  `,
  side: BackSide,
  blending: AdditiveBlending,
  transparent: true,
}

export default halo
