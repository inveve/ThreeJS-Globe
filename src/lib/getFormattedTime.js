/**
 * Given a date, returns days passed from time to the current Time
 * @param {Date} time
 * @returns
 */
const getFormattedTime = (time) => {
  const deltaTime = (new Date(time) - new Date()) / (1000 * 3600 * 24)
  const dateFormatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' })
  return dateFormatter.format(Math.round(deltaTime), 'days')
}

export default getFormattedTime
