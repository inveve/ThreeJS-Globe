import { CatmullRomCurve3, Vector3 } from 'three'
/**
 * Returns a line of N points CatmullRomCurve3
 * @param {Float} from
 * @param {Float} to
 * @param {Number} numberOfPoints
 * @returns
 */
const getLineCurve = (from, to, numberOfPoints = 20) => {
  const points = []
  for (let i = 0; i <= numberOfPoints; i++) {
    let point = new Vector3().lerpVectors(from, to, i / numberOfPoints)
    point.normalize()
    point.multiplyScalar(1 + 0.1 * Math.sin((Math.PI * i) / numberOfPoints))
    points.push(point)
  }
  return new CatmullRomCurve3(points)
}

export default getLineCurve
