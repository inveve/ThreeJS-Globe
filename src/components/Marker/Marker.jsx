import { useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import { Vector3 } from 'three'
import tower from '../../shaders/tower'

import calcPosFromLatLonRad from '../../lib/calcPosFromLatLonRad'
import { Color } from 'three'
import { cloneDeep } from 'lodash'

const Marker = ({ lat, lon, onMouseEnter, onMouseLeave }) => {
  const ref = useRef(null)
  const ref2 = useRef(null)
  const [hovered, setHovered] = useState(false)
  const position = new Vector3(...calcPosFromLatLonRad(lat, lon, 1))
  const position2 = new Vector3(...calcPosFromLatLonRad(lat, lon, 1.1))

  const onHover = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
    onMouseEnter()
  }
  const onHoverLeave = () => {
    setHovered(false)
    onMouseLeave()
    document.body.style.cursor = ''
  }

  useEffect(() => {
    ref.current.lookAt(new Vector3(0, 0, 0))
    ref.current.rotateX(Math.PI / 2)
    ref2.current.lookAt(new Vector3(0, 0, 0))
    ref2.current.rotateX(Math.PI / 2)
  }, [])

  useFrame(({ clock }) => {
    ref.current.material.uniforms.uTime.value = clock.getElapsedTime()
    ref.current.scale.y = Math.sin(clock.getElapsedTime() * 0.5)
  })

  const newShader = {
    ...cloneDeep(tower),
    uniforms: {
      uTime: { value: 1.0 },
      uColor: {
        value: hovered ? new Color(1.0, 1.0, 1.0) : new Color(0.0, 1.0, 0.5),
      },
    },
  }
  console.log('Hovered: ', hovered)
  return (
    <group>
      <mesh
        position={position}
        ref={ref}
        onPointerOver={onHover}
        onPointerLeave={onHoverLeave}
      >
        <boxGeometry args={[0.008, 0.18, 0.008]} />
        <shaderMaterial {...newShader} />
      </mesh>
      <mesh position={position2} ref={ref2}>
        <boxGeometry args={[0.006, 0.006, 0.006]} />
        <meshBasicMaterial color={'white'} />
      </mesh>
    </group>
  )
}
export default Marker
