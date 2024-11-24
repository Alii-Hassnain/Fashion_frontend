import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.jpg";
import support24Hours from "../assets/featureImg/support24Hours.png";
import freeShipping from "../assets/featureImg/freeShipping.png";
import securePayment from "../assets/featureImg/securePayment.png";
import easyReturn from "../assets/featureImg/easyReturn.png";
import tryVirtually from "../assets/featureImg/TryVirtually.png";
// import return 
// import { FaShippingFast } from "react-icons/fa";

export const Links = [
    {
      id:1,
      navLink:"Home",
      toLink:"/"
    },
    {
      id:2,
      navLink:"Products",
      toLink:"/products"
    },
    {
      id:3,
      navLink:"About",
      toLink:"/about"
    },
    {
      id:4,
      navLink:"Checkout",
      toLink:"/checkout"
    },
    {
      id:5,
      navLink:"Cart",
      toLink:"/cart"
    },
    
  ]

export const SliderData = [
  {
    id:1,
    img:hero1,
    title:"The Fashion You Like",
    desc:"Try what you like, Ask what you want"
  },
  {
    id:2,
    img:hero2,
    title:"Try Room",
    desc:"just upload your image and try the dress"

  },
  {
    id:3,
    img:hero2,
    title:"Winter Collection",
    desc:"Get 50% off on winter collection"
  },
  {
    id:4,
    img:hero1,
    title:"Summer Collection",
    desc:"Get 50% off on summer collection"
  }

]

export const FeaturesData = [
  {
    id:0,
    img:tryVirtually,
    title:"Try Virtually",
    desc:"Try the dress virtually "
  },
  {
    id:2,
    img:support24Hours,
    title:"Customer Support",
    desc:"24/7 customer support available"
  },
  {
    id:1,
    img:freeShipping,
    title:"Free Shipping",
    desc:"Get free shipping on all orders over 5000 Rs"
  },
  // {
  //   id:3,
  //   img:securePayment,
  //   title:"Secure Payment",
  //   desc:"Secure payment method available"
  // },
  {
    id:4,
    img:easyReturn,
    title:"Easy Return",
    desc:"Easy return policy available"
  }
]