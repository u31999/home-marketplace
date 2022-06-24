import {FaGithub, FaLinkedin, FaAmilia, FaLink} from 'react-icons/fa'

function Devloper({close}) {
  return (
    <div className="developerContainer">
        <button type='button' 
        className='closeButton'
        onClick={() => close(false)}>CLOSE</button>
            <div className='developerHeader'>
                <h3 className='developerTextHeader'>Home MarketPlace</h3>
            </div>
            <div>
            <p className='developerSubHeader'>Build using</p>
                <ul className='developerList'>
                <li>React for front-end</li>
                <li>Firebase for back-end</li>
                <li>Slider using <a href="https://swiperjs.com/" target='_blank' rel='noreferrer'>Swiper <FaLink /></a></li>
                <li>Map using <a href="https://leafletjs.com/" target='_blank' rel='noreferrer'>leaflet <FaLink /></a></li>
                <li><a href="https://github.com/u31999/home-marketplace" target='_blank' rel='noreferrer'>Projet Source Code <FaGithub /></a></li>
                </ul>
            </div>
            <div>
                <p className='developerSubHeader'>Contact Developer</p>
                <div className='developerIcon'>
                <a href='https://github.com/u31999'
                 target='_blank' rel='noreferrer'>
                    <FaGithub />
                </a>
                <a href='https://www.linkedin.com/in/ahmed-hassan-elzain/'
                 target='_blank' rel='noreferrer'>
                    <FaLinkedin />
                </a>
                <a href='mailto:alzain31999@gmail.com'>
                    <FaAmilia />
                </a>
                </div>
            </div>
        
    </div>
  )
}

export default Devloper
