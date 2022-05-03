import styled from 'styled-components'

const StyledCard = styled.div`
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

/**
 * Used to display information
 */
const Card = ({ title, description }) => {
  return (
    <StyledCard>
      <div>
        <img
          src="https://github.githubassets.com/images/modules/site/home/globe/pull-request-icon.svg"
          alt=""
          width={30}
        />
      </div>
      <div>
        <Heading>{title}</Heading>
        <Description>{description}</Description>
      </div>
    </StyledCard>
  )
}

export default Card
