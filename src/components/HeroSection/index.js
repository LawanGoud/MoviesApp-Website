import './index.css'

const HeroSection = ({backgroundImage, children}) => {
  const sectionStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '60vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
  }

  return (
    <section style={sectionStyle}>
      <div className="hero-content">{children}</div>
    </section>
  )
}

export default HeroSection
