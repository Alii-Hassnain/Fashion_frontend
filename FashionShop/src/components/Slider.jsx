// import hero1 from "../assets/hero1.webp";
// import hero2 from "../assets/hero2.webp";
// import hero3 from "../assets/hero3.jpg";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroData } from "./Links";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useState } from "react";

const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-10 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 z-10"
    onClick={onClick}
  >
    <FaChevronLeft /> {/* Left arrow */}
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 z-10"
    onClick={onClick}
  >
    <FaChevronRight /> {/* Right arrow */}
  </button>
);

const SimpleSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    pauseOnHover: false,
    pauseOnFocus: false,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const containerVariants = {
    hidden: { opacity: 0 , x:100},
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.5, // Delay each child animation by 0.3s
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start below and hidden
    visible: { opacity: 1, y: 0 }, // Slide into position
  };

  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {HeroData.map((item, index) => {
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
                <motion.div
                  class="absolute top-1/3 left-2/4 p-4 rounded shadow text-white"
                  initial="hidden" // Start off-screen to the right
                  animate={currentSlide === index ? "visible" : "hidden"}
                  variants={containerVariants}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.h2
                    className="text-4xl font-bold"
                    variants={itemVariants}
                  >
                    {title}
                  </motion.h2>
                  <motion.p className="text-l mt-3" variants={itemVariants}>
                    {desc}
                  </motion.p>
                  <motion.div variants={itemVariants}>
                    <Link to={"/products"}>
                      <button className="btn btn-outline bg-white mt-6">
                        Shop now
                      </button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
