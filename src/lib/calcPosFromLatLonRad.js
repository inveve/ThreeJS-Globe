/**
 * Given a latitude and a longuitude, returns the postion within a sphere
 * @param {Float} lat
 * @param {Float} lon
 * @param {Float} radius
 * @returns
 */
const calcPosFromLatLonRad = (lat, lon, radius) => {
  let phi = (90 - lat) * (Math.PI / 180)
  let theta = (lon + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return [x, y, z]
}
export default calcPosFromLatLonRad
