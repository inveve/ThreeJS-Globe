import { React } from 'react'
import { useTexture } from '@react-three/drei'
import earthClip from '../shaders/earthClip'
import { RepeatWrapping } from 'three'
const EarthOverlay = () => {
  const alpha = useTexture('earthspec1k.jpg')

  alpha.wrapS = RepeatWrapping
  alpha.wrapT = RepeatWrapping
  alpha.repeat.set(1, 1)

  return (
    <points>
      <sphereBufferGeometry args={[1.001, 400, 400]} />
      <shaderMaterial {...earthClip(null, alpha)} />
    </points>
  )
}

export default EarthOverlay
