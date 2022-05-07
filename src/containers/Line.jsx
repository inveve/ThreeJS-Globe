import Arc, { ArcPoint, ArcWave } from '../components/Arc'
import { useEffect, useRef, useState } from 'react'
import { useFrame, useStore } from '@react-three/fiber'
import { Vector3, Box3 } from 'three'
import calcPosFromLatLonRad from '../lib/calcPosFromLatLonRad'
import getLineCurve from '../lib/getLineCurve'
const Line = ({ gop, gm, onMouseEnter, onMouseLeave }) => {
  const lineCurve = getLineCurve(
    new Vector3(...calcPosFromLatLonRad(gm.lat, gm.lon, 1)),
    new Vector3(...calcPosFromLatLonRad(gop.lat, gop.lon, 1))
  )

  return (
    <>
      <group>
        <Arc
          target={gop}
          curve={lineCurve.points}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </group>
    </>
  )
}

export default Line
