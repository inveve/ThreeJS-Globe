/**
 * Toggle Args amount of times the visibility of each.
 * @param  {...Mesh} args
 * @returns
 */
const toggleMeshVisibility = (...args) =>
  args.forEach((mesh) => (mesh.visible = !mesh.visible))

export default toggleMeshVisibility
