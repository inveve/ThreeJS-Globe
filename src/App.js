import styled from 'styled-components'
import React, { Suspense, useCallback, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import LineContainer from './containers/Line'
import Card from './components/Card/Card'
import Globe, { GlobeAtmosphere, GlobeMap } from './components/Globe'
import Marker from './components/Marker'
import useMouse from './hooks/useMouse'
import formatPullRequest from './lib/formatPullRequest'
import pullRequestData from './data/feed.json'
import GlobalStyle from './globalStyles'
import useModalStore from './store/modal'

const CanvasContainer = styled.div`
  height: 100vh;
`
/**
 * HTML component,purely for displaying HTML
 * Only controls the modal status, since its the only HTML display of the application
 */
const HTMLScene = () => {
  const { open, openIndex } = useModalStore((state) => state)
  const card = formatPullRequest(pullRequestData[openIndex])

  const { position } = useMouse()
  const calculateMousePosition = useCallback(
    () => [position.x + 10, position.y + 10],
    [position]
  )

  return open ? (
    <Html calculatePosition={calculateMousePosition}>
      <Card {...card} />
    </Html>
  ) : null
}

/**
 * Scene component
 * Renders all the underlying r3f components as well as passing some callbacks
 */
const Scene = () => {
  const globeRef = useRef(null)
  const toggleModal = useModalStore((state) => state.toggleOpen)

  // Rotate Globe
  useFrame(() => {
    globeRef.current.rotation.y -= 0.0005
    globeRef.current.rotation.x = -0.4
    globeRef.current.rotation.z = 0.1
  })

  return (
    <group ref={globeRef}>
      <GlobeAtmosphere />
      <GlobeMap />
      <Globe />

      {pullRequestData.slice(0, 10).map((pullRequest, index) => {
        const componentProps = {
          ...pullRequest,
          lat: pullRequest.gm.lat,
          lon: pullRequest.gm.lon,
          onMouseEnter: () => toggleModal(index),
          onMouseLeave: () => toggleModal(index),
        }
        // Position from -> to is not the same
        return pullRequest.uml !== pullRequest.uol ? (
          <LineContainer {...componentProps} key={index} />
        ) : (
          <Marker {...componentProps} key={index} />
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
