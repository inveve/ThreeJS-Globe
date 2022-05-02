import styled from 'styled-components'

const StyledMarker = styled.div`
  min-width: 500px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  padding: 25px;
  backdrop-filter: blur(10px);
  display: flex;
  gap: 10px;
`
const Heading = styled.div`
  color: white;
  font-weight: 700;
  font-size: 20px;
`

const Description = styled.p`
  color: #959da5;
`

const getFormattedTime = (time) => {
  const deltaTime = (new Date(time) - new Date()) / (1000 * 3600 * 24)
  const dateFormatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' })
  return dateFormatter.format(Math.round(deltaTime), 'days')
}
const Marker = ({
  prNumber,
  title,
  language,
  repoLocation,
  mergedFrom,
  mergedTimestamp,
}) => {
  const time = getFormattedTime(mergedTimestamp)
  return (
    <StyledMarker>
      <div>
        <img
          src="https://github.githubassets.com/images/modules/site/home/globe/pull-request-icon.svg"
          alt=""
          width={30}
        />
      </div>
      <div>
        <Heading>
          #{prNumber} {title}
        </Heading>
        <Description>
          <strong>{language}</strong>, Opened in {repoLocation}, merged {time}{' '}
          in {mergedFrom}
        </Description>
      </div>
    </StyledMarker>
  )
}

export default Marker
