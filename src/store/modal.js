import create from 'zustand'

const useStore = create((set) => ({
  open: false,
  openIndex: 0,
  toggleOpen: (index) =>
    set((state) => ({ open: !state.open, openIndex: index })),
}))

export default useStore
