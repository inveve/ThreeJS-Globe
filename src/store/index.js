import { Color } from 'three'
import create from 'zustand'

const useStore = create((set) => ({
  params: {
    globe: {
      color: new Color(`hsl(156, 100%, 51%)`),
      haloOuter: new Color(`#53C6AA`),
      haloInner: new Color(`#53C6AA`),
    },
    dots: {
      color: { value: new Color('hsl(190,80%,40%)') },
      line: { value: new Color('#674FA8') },
    },
  },
}))

export default useStore
