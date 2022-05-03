import Arc, { ArcPoint } from '../components/Arc'

const Line = ({ gop, gm, onMouseEnter, onMouseLeave }) => {
  return (
    <>
      <ArcPoint {...gop} />
      <Arc
        from={[gm.lat, gm.lon]}
        to={[gop.lat, gop.lon]}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </>
  )
}

export default Line
