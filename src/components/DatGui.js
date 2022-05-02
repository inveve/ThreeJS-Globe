import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { GUI } from 'dat.gui'
import useStore from '../store'

const gui = new GUI()
const DatGui = () => {
  const camera = useThree(({ camera }) => camera)
  const { params, setParams } = useStore((state) => state)

  useEffect(() => {
    Object.entries(params).forEach(([key, val]) => {
      let guiFolder = gui.addFolder(key)
      Object.entries(val).forEach(([_propKey, propVal]) => {
        guiFolder.addColor(propVal, 'value').onChange((val) => {
          setParams(key, _propKey, val)
        })
      })
    })
    const cameraFolder = gui.addFolder('Camera')
    cameraFolder.add(camera.position, 'x', 0, 40)
    cameraFolder.add(camera.position, 'z', 0, 40)
    cameraFolder.add(camera.position, 'y', 0, 40)
    cameraFolder.add(camera, 'fov', 0, 100)
    cameraFolder.open()
  }, [])

  useFrame(() => {
    camera.updateProjectionMatrix()
  })
  return null
}

export default DatGui
