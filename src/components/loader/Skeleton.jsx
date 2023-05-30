import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { FiArrowRight } from "react-icons/fi"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

import "swiper/css"
import "swiper/css/navigation"
import "../../css/additional/swiper.css"

const SkeletonWrapper = ({ componentname }) => {
   const swiperRef = useRef()

   const prevbtn = (e) => {
      e.preventDefault()
      swiperRef.current?.slidePrev()
   }

   const nextbtn = (e) => {
      e.preventDefault()
      swiperRef.current?.slideNext()
   }

   return (
      <div className="my-10">
         <div className="mb-5 flex items-center justify-between">
            <p className="text-xl font-bold">{componentname}</p>
            <div className="underlineEffect flex cursor-pointer items-center justify-center gap-1.5">
               <span className="font-medium">More Products</span>
               <FiArrowRight size={14} className="mt-0.5" />
            </div>
         </div>
         <div className="relative bg-white p-3.5">
            <button
               onClick={prevbtn}
               className="group absolute left-0 top-[40%] z-10"
            >
               <IoIosArrowBack
                  size={40}
                  className="text-custom-dark group-hover:text-custom-orange"
               />
            </button>
            <Swiper
               modules={[Navigation]}
               onBeforeInit={(swiper) => {
                  swiperRef.current = swiper
               }}
               breakpoints={{
                  320: { slidesPerView: 2, spaceBetween: 0 },
                  426: { slidesPerView: 2, spaceBetween: 0 },
                  650: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 5, spaceBetween: 0 },
               }}
            >
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((_, i) => (
                  <SwiperSlide key={i}>
                     <div className="group relative flex h-80 w-32 flex-col items-center overflow-hidden border border-gray-200 bg-white hover:border-gray-500 xs:w-[154px] ms:w-44 md:h-96 md:w-52">
                        <div className="flex w-full cursor-pointer justify-center">
                           <img
                              src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
                              alt="no_image"
                              className=""
                           />
                        </div>
                        <div className="mt-5 flex w-full flex-col items-center justify-center gap-2 px-4">
                           <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200"></div>
                           <div className="flex w-full items-center justify-center gap-2 px-4">
                              <div className="h-4 w-5 animate-pulse rounded bg-gray-200"></div>
                              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
                           </div>
                        </div>
                        <div className="mt-6 flex w-full items-center justify-center gap-2 px-4">
                           <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200"></div>
                           <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200"></div>
                        </div>
                        <div className="absolute bottom-0 mt-5 h-8 w-full animate-pulse bg-gray-200"></div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
            <button
               onClick={nextbtn}
               className="group absolute right-0 top-[40%] z-10"
            >
               <IoIosArrowForward
                  size={40}
                  className="text-custom-dark group-hover:text-custom-orange"
               />
            </button>
         </div>
      </div>
   )
}

export default SkeletonWrapper
