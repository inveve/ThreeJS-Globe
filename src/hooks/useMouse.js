import { useEffect, useRef } from 'react'

const useMouse = () => {
  // No need to update state
  const position = useRef({ x: 0, y: 0 })

  const onMouseMove = (e) => (position.current = { x: e.clientX, y: e.clientY })

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove, false)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return {
    position: position.current,
  }
}

export default useMouse
