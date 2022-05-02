import { useEffect, useState } from 'react'

const useMouse = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY })

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove, false)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return {
    position,
  }
}

export default useMouse
