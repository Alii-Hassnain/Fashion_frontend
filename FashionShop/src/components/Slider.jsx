import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.jpg";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SliderData } from "./Links";

const SimpleSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {SliderData.map((item) => {
          const { id, img, title, desc } = item;
          return (
            <div key={id} className="relative w-full">
              {/* <SimpleSlider /> */}
              <img
                className="w-full h-auto object-cover"
                src={img}
                alt="hero1"
              />
              <div className="grid grid-cols-2 bg-blue-50">
                {/* left side */}

                <motion.div
                  class="absolute top-1/3 left-2/4 p-4 rounded shadow text-white"
                  initial={{ opacity: 0, x: 50 }} // Start off-screen to the right
                  animate={{ opacity: 1, x: 0 }} // Move into position
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <h2 class="text-4xl font-bold">{title}</h2>
                  <p className="text-l mt-3">
                    {desc}
                  </p>
                  <Link to={"/products"}>
                    <button className="btn btn-outline bg-white mt-6">
                      Shop now
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          );
        })}

        <div className="relative w-full">
          {/* <SimpleSlider /> */}
          <img className="w-full h-auto object-cover" src={hero2} alt="hero1" />
          <div className="grid grid-cols-2 bg-blue-50">
            {/* left side */}

            <motion.div
              class="absolute top-1/3 left-2/4 p-4 rounded shadow text-white"
              initial={{ opacity: 0, x: 50 }} // Start off-screen to the right
              animate={{ opacity: 1, x: 0 }} // Move into position
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 class="text-4xl font-bold">The Fashion You Like</h2>
              <p className="text-l mt-3">
                Try what you like, Ask what you want
              </p>
              <Link to={"/products"}>
                <button className="btn btn-outline bg-white mt-6">
                  Shop now
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;