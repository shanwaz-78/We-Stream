import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import { data } from '../data/ImgObj';
import 'react-alice-carousel/lib/alice-carousel.css';


function Carousel() {

    const items = data.map((item,index) => (
        <div className='logo-ls-item' key={index}>
            <img src={item.img} alt="" title={item.name} />
        </div>
    ))

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 4,
        },
        1024: {
            items: 6
        }
    }
    return (
            <AliceCarousel
            mouseTracking
            infinite
            autoPlay
            autoPlayInterval={800}
            autoPlayStrategy="all"
            animationDuration={2000}
            fadeOutAnimation={true} 
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            />
    )
}

export default Carousel
