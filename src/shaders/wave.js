import { BackSide } from 'three'
import { Color } from 'three'

const wave = {
  uniforms: {
    uTime: { value: 1.0 },
    uColor: { value: new Color('purple') },
  },
  transparent: true,
  vertexShader: `
  varying vec2 vUv;
  void main()
  {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    vUv = uv;
  }
  `,
  fragmentShader: `
  precision mediump float;
  uniform vec3 uColor;
  varying vec2 vUv;
  uniform float uTime;
  void main() {

    float alpha = 1.0;
    float vRadius = tan(uTime);
    float strength = step(0.015, abs(distance(vUv, vec2(0.5)) - vRadius  / 2.5));
    
    alpha = 1.0 - tan(uTime);
    if (strength == 1.0) alpha = 0.0;
    gl_FragColor = vec4(uColor, alpha);
  }
  `,
  side: BackSide,
}

export default wave
