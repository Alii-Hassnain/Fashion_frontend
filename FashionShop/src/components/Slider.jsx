import hero1 from '../assets/hero1.webp'
import hero2 from '../assets/hero2.webp'
import hero3 from '../assets/hero3.jpg'
import Slider from "react-slick";


export default function SimpleSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Slider {...settings}>
        <div>
        
        </div>
        <div>
       
        </div>
        <div>
      
        </div>
        <div>
        
        </div>
      </Slider>
    );
  }