import { Canvas, useFrame } from '@react-three/fiber'
import styled from 'styled-components'
import { OrbitControls, Html } from '@react-three/drei'
import GlobalStyle from './globalStyles'
import React, { Fragment, Suspense, useRef, useState } from 'react'
import useMouse from './hooks/useMouse'
import Earth from './components/Earth'
import Line from './components/Line'

import BallPoint from './components/BallPoint'
import Wave from './components/Wave'

import EarthOverlay from './components/EarthOverlay'
import EarthAtmos from './components/EarthAtmos'
import feed from './data/feed.json'

import Marker from './components/Marker'
import Tower from './components/Tower'
import DatGui from './components/DatGui'
const CanvasContainer = styled.div`
  height: 100vh;
`

const Scene = () => {
  const groupRef = useRef(null)

  const [marker, setMarker] = useState(null)
  const [lineHovered, setLineHovered] = useState(false)
  const { position } = useMouse()
  useFrame(() => {
    /*    groupRef.current.rotation.y -= 0.0005
    groupRef.current.rotation.x = -0.4
    groupRef.current.rotation.z = 0.1 */
  })

  const handleHover = (index) => {
    if (!index) {
      setLineHovered(false)
      return
    }
    const { pr, uml, uol, l, nwo, ma } = feed[index]
    setMarker({
      prNumber: pr,
      title: nwo,
      language: l,
      repoLocation: uml,
      mergedFrom: uol,
      mergedTimestamp: ma,
    })
    setLineHovered(true)
  }

  const calculateMousePosition = () => [position.x + 10, position.y + 10]

  return (
    <group ref={groupRef}>
      {lineHovered && (
        <Html calculatePosition={calculateMousePosition}>
          <Marker {...marker} />
        </Html>
      )}
      <EarthOverlay />
      <EarthAtmos />
      <Earth />
      {feed.slice(0, 10).map(({ gm, gop, uml, uol }, index) => {
        return (
          <Fragment key={index}>
            {uml !== uol ? (
              <>
                <BallPoint {...gm} />
                <Wave {...gop} />
                <BallPoint {...gop} />
                <Line
                  from={[gm.lat, gm.lon]}
                  to={[gop.lat, gop.lon]}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={() => handleHover(false)}
                />
              </>
            ) : (
              <Tower {...gm} />
            )}
          </Fragment>
        )
      })}

      <axesHelper args={[1000]} />
    </group>
  )
}

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <CanvasContainer>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ fov: 20, position: [4.6, 1.9, 2.4] }}
        >
          <DatGui />
          <spotLight
            intensity={0.01}
            angle={0.5}
            penumbra={1}
            position={[5, 13, 12]}
          />
          <ambientLight intensity={0.005} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </CanvasContainer>
    </div>
  )
}

export default App
