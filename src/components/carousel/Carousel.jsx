import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function Carousel() {
   const settings = {
      dots: false,
      fade: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      speed: 2000,
      autoplay: true,
      autoplaySpeed: 6000,
      cssEase: "ease-in-out",
   }

   return (
      <div className="z-10 mb-10 mt-5">
         <div className="h-max w-full">
            <Slider {...settings}>
               {[
                  "https://ds.rokomari.store/rokomari110/banner/2494dac9-48fa-4fcb-ac3b-c41721867051.webp",
                  "https://ds.rokomari.store/rokomari110/banner/9832232d-cb52-483d-bd57-68c3f63345e0.webp",
               ].map((data, index) => {
                  return (
                     <div key={index} className="h-full w-full">
                        <img
                           src={data}
                           alt=""
                           className="h-full w-full object-fill"
                        />
                     </div>
                  )
               })}
            </Slider>
         </div>
      </div>
   )
}

export default Carousel
