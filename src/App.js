import { Canvas, useFrame } from '@react-three/fiber'
import styled from 'styled-components'
import { OrbitControls, Html } from '@react-three/drei'
import GlobalStyle from './globalStyles'
import React, { Fragment, Suspense, useRef, useState } from 'react'
import useMouse from './hooks/useMouse'
import Arc, { ArcPoint } from './components/Arc'
import Globe, { GlobeAtmosphere, GlobeMap } from './components/Globe'
import feed from './data/feed.json'
import Card from './components/Card/Card'
import Marker from './components/Marker'
import getFormattedTime from './lib/getFormattedTime'

const CanvasContainer = styled.div`
  height: 100vh;
`

const HTMLScene = () => {
  return <></>
}
const Scene = () => {
  const groupRef = useRef(null)

  const [card, setCard] = useState(null)
  const [lineHovered, setLineHovered] = useState(false)
  const { position } = useMouse()

  useFrame(() => {
    groupRef.current.rotation.y -= 0.0005
    groupRef.current.rotation.x = -0.4
    groupRef.current.rotation.z = 0.1
  })

  const handleHover = (index) => {
    if (!index) {
      setLineHovered(false)
      return
    }
    const { pr, uml, uol, l, nwo, ma } = feed[index]
    const time = getFormattedTime(ma)

    setCard({
      title: `#${pr} ${nwo}`,
      description: `${l}, Opened in ${uml}, merged ${time} in ${uol}`,
    })
    setLineHovered(true)
  }

  const calculateMousePosition = () => [position.x + 10, position.y + 10]

  return (
    <group ref={groupRef}>
      {lineHovered && (
        <Html calculatePosition={calculateMousePosition}>
          <Card {...card} />
        </Html>
      )}
      <GlobeAtmosphere />
      <GlobeMap />
      <Globe />
      {feed.slice(0, 10).map(({ gm, gop, uml, uol }, index) => {
        return (
          <Fragment key={index}>
            {uml !== uol ? (
              <>
                <ArcPoint {...gop} />
                <Arc
                  from={[gm.lat, gm.lon]}
                  to={[gop.lat, gop.lon]}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={() => handleHover(false)}
                />
              </>
            ) : (
              <Marker
                {...gm}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={() => handleHover(false)}
              />
            )}
          </Fragment>
        )
      })}
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
          <spotLight
            intensity={0.4}
            angle={0.5}
            penumbra={1}
            position={[5, 13, 12]}
          />
          <ambientLight intensity={0.12} />
          <Suspense fallback={null}>
            <HTMLScene />
            <Scene />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </CanvasContainer>
    </div>
  )
}

export default App
