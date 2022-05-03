import getFormattedTime from './getFormattedTime'

/**
 * Given pull request information, returns a title and a matching description
 * @param {Float} lat
 * @param {Float} lon
 * @param {Float} radius
 * @returns
 */
const formatPullRequestData = ({ pr, uml, uol, l, nwo, ma }) => ({
  title: `#${pr} ${nwo}`,
  description: `${l}, Opened in ${uml}, merged ${getFormattedTime(
    ma
  )} in ${uol}`,
})

export default formatPullRequestData
