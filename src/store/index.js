import { Color } from 'three'
import create from 'zustand'

const useStore = create((set) => ({
  params: {
    earth: {
      color: { type: '', value: new Color(0, 34, 34) },
      haloOuter: { value: new Color(`hsl(156, 100%, 51%)`) },
      haloInner: { value: new Color(`hsl(156, 100%, 41%)`) },
    },
    dots: {
      color: { type: '', value: new Color(130, 255, 23) },
      line: { type: '', value: new Color(130, 255, 23) },
    },
  },
  setParams: (folder, name, val) => {
    set((state) => ({ [state.params[folder][name]]: val }))
  },
}))

export default useStore
