import { Color } from 'three'

const marker = {
  uniforms: {
    uTime: { value: 1.0 },
    uColor: { value: new Color(0.0, 1.0, 0.5) },
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
    uniform float uTime;
    uniform vec3 uColor;

    void main() {
      float alpha = 1.0 - tan(uTime);
      gl_FragColor = vec4(uColor,0.4); 
    }
  `,
}

export default marker
