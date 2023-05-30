import { useRef } from "react"
import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { useDispatch, useSelector } from "react-redux"
import { AiOutlineMinus, AiOutlinePlus, AiFillEye } from "react-icons/ai"
import { BsMinecartLoaded } from "react-icons/bs"
import { SnackbarProvider, enqueueSnackbar } from "notistack"

import { addToCart, decreaseCart, incrementCart } from "../../services/cart"
import { useGetBooksQuery } from "../../services/awarded"
import SkeletonWrapper from "../loader/Skeleton"
import LazyLoad from "../../utils/LazyLoad"

import "swiper/css"
import "swiper/css/navigation"
import "../../css/additional/swiper.css"

const AwardedBooks = () => {
   const swiperRef = useRef()
   const dispatch = useDispatch()
   const { data: awardedBooks, isLoading, error } = useGetBooksQuery()
   const cart = useSelector((state) => state.cart)

   const handleWishlist = (e, book) => {
      enqueueSnackbar(
         `Wishlist was updated for ${book?.title?.substr(0, 20)}`,
         {
            variant: "success",
            autoHideDuration: 1000,
            preventDuplicate: true,
         }
      )
   }

   const handleLeftArrow = (e) => {
      e.preventDefault()
      swiperRef.current?.slidePrev()
   }
   const handleRightArrow = (e) => {
      e.preventDefault()
      swiperRef.current?.slideNext()
   }

   if (isLoading || error || awardedBooks?.products?.length === 0)
      return <SkeletonWrapper componentname="Awarded Books" />

   return (
      <div className="my-10">
         <SnackbarProvider
            preventDuplicate
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "right",
            }}
         />
         <div className="mb-5 flex items-center justify-between">
            <p className="text-xl font-bold">Awarded Books</p>
            <Link
               to="/awarded-books"
               className="underlineEffect flex cursor-pointer items-center justify-center gap-1.5"
            >
               <span className="font-medium">More Products</span>
               <FiArrowRight size={14} className="mt-0.5" />
            </Link>
         </div>
         <div className="relative bg-white p-3.5">
            <button
               onClick={handleLeftArrow}
               className="group absolute -left-1.5 top-[40%] z-10"
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
               className="mySwiper"
               breakpoints={{
                  320: { slidesPerView: 2, spaceBetween: 0 },
                  426: { slidesPerView: 2, spaceBetween: 0 },
                  650: { slidesPerView: 3, spaceBetween: 20 },
                  1024: { slidesPerView: 5, spaceBetween: 0 },
               }}
            >
               {awardedBooks?.products?.map((book, i) => (
                  <SwiperSlide key={i}>
                     <div className="group relative flex h-80 w-32 flex-col items-center overflow-hidden border border-gray-200 bg-white hover:border-gray-500 xs:w-[154px] ms:w-44 md:h-96 md:w-52">
                        {/* IMAGE */}
                        <div className="relative h-full w-full overflow-hidden">
                           <div className="absolute left-0 top-0 h-full w-full">
                              <LazyLoad
                                 imgUrl={book?.images[0]}
                                 imgAlt={book?.title}
                                 className="h-full w-full object-contain md:h-[300px] md:object-cover"
                              />
                           </div>
                           <ul className="absolute right-2 top-1">
                              <li
                                 onClick={(e) => handleWishlist(e, book)}
                                 className=" relative my-1.5 flex h-10 w-10 translate-x-20 transform cursor-pointer list-none items-center justify-center bg-white transition duration-300 group-hover:translate-x-0"
                              >
                                 <p className="text-xl hover:text-custom-orange">
                                    &#x2764;
                                 </p>
                              </li>
                              <li className=" relative my-1.5 flex h-10 w-10 translate-x-20 transform cursor-pointer list-none items-center justify-center bg-white transition delay-100 duration-300 group-hover:translate-x-0">
                                 <Link
                                    to={`/product/${book?._id}`}
                                 >
                                    <AiFillEye
                                       size={24}
                                       className="hover:text-custom-orange"
                                    />
                                 </Link>
                              </li>
                           </ul>
                           <div className="absolute left-2 top-0 h-10 w-10">
                              {book?.countInStock === 0 ? (
                                 <img
                                    src="https://cdn-icons-png.flaticon.com/128/5129/5129345.png"
                                    alt=""
                                    className="relative h-full w-full -translate-y-20 transform animate-pulse object-contain transition duration-500 group-hover:translate-y-0"
                                 />
                              ) : null}
                           </div>
                        </div>
                        {/* CONTENT */}
                        <div className="w-full bg-white">
                           {/* TITLE */}
                           <div className="mb-1.5 mt-2 flex flex-col items-center justify-center gap-0.5 text-center">
                              <p className="px-2 text-sm">
                                 {book?.title?.length > 20
                                    ? book?.title.substr(0, 20)
                                    : book?.title}
                                 {book?.title?.length > 20 && "..."}
                              </p>
                              <p className="-mt-1 px-2">
                                 <span className="text-custom-blue text-xs">
                                    by{" "}
                                    {book?.author?.name?.length > 20
                                       ? book?.author?.name?.substr(0, 20)
                                       : book?.author?.name}
                                    {book?.author?.name?.length > 20 && "..."}
                                 </span>
                              </p>
                              {/* RATING */}
                              <div className="flex w-full items-center justify-center">
                                 <span className="mr-0.5">
                                    <i
                                       className={
                                          book?.rating >= 1
                                             ? "fas fa-star text-custom-yellow"
                                             : book?.rating >= 0.5
                                             ? "fas fa-star-half-alt text-custom-yellow"
                                             : "far fa-star text-custom-yellow"
                                       }
                                    ></i>
                                 </span>
                                 <span className="mr-0.5">
                                    <i
                                       className={
                                          book?.rating >= 2
                                             ? "fas fa-star text-custom-yellow"
                                             : book?.rating >= 1.5
                                             ? "fas fa-star-half-alt text-custom-yellow"
                                             : "far fa-star text-custom-yellow"
                                       }
                                    ></i>
                                 </span>
                                 <span className="mr-0.5">
                                    <i
                                       className={
                                          book?.rating >= 3
                                             ? "fas fa-star text-custom-yellow"
                                             : book?.rating >= 2.5
                                             ? "fas fa-star-half-alt text-custom-yellow"
                                             : "far fa-star text-custom-yellow"
                                       }
                                    ></i>
                                 </span>
                                 <span className="mr-0.5">
                                    <i
                                       className={
                                          book?.rating >= 4
                                             ? "fas fa-star text-custom-yellow"
                                             : book?.rating >= 3.5
                                             ? "fas fa-star-half-alt text-custom-yellow"
                                             : "far fa-star text-custom-yellow"
                                       }
                                    ></i>
                                 </span>
                                 <span className="mr-0.5">
                                    <i
                                       className={
                                          book?.rating >= 5
                                             ? "fas fa-star text-custom-yellow"
                                             : book?.rating >= 4.5
                                             ? "fas fa-star-half-alt text-custom-yellow"
                                             : "far fa-star text-custom-yellow"
                                       }
                                    ></i>
                                 </span>
                                 <span className="ml-0.5 text-gray-600">
                                    ({book?.numReviews})
                                 </span>
                              </div>
                              {/* PROGRESS */}
                              <div className="hidden w-full items-center justify-between px-2 md:flex">
                                 <span className="text-xs font-medium">
                                    Sold: {Math.floor(Math.random() * 5)}
                                 </span>
                                 <div className="h-1.5 w-1/3 rounded-full bg-gray-200">
                                    <div className="h-1.5 w-1/3 rounded-full bg-custom-cyan"></div>
                                 </div>
                                 <span className="text-xs font-medium">
                                    In stock: {book?.countInStock}
                                 </span>
                              </div>
                           </div>

                           {/* PRICE & DISCOUNT */}
                           <div
                              className={
                                 book?.discount === 0
                                    ? "mb-2 flex w-full items-center justify-center px-2.5"
                                    : "mb-2 flex w-full items-center justify-between px-2.5"
                              }
                           >
                              <div className="flex flex-col items-center justify-center text-center">
                                 {book?.discount === 0 ? (
                                    <span className="text-custom-dark text-base font-semibold">
                                       Tk. {book?.price}
                                    </span>
                                 ) : (
                                    <div className="flex flex-col items-start justify-start gap-1.5 md:flex-row md:items-center md:justify-center">
                                       <span className="text-xs font-semibold text-custom-green md:text-base">
                                          TK.{" "}
                                          {Math.round(book?.discountedPrice)}
                                       </span>
                                       <span className="text-xs font-semibold text-gray-500 line-through">
                                          TK. {book?.price}
                                       </span>
                                    </div>
                                 )}
                              </div>
                              {book?.discount === 0 ? null : (
                                 <p className="rounded-md bg-custom-hot px-1 py-1 text-xs font-semibold text-white md:px-2">
                                    {Math.ceil(book?.discount)}% OFF
                                 </p>
                              )}
                           </div>

                           {/* CART */}
                           <div className="absolute bottom-0 h-9 w-full">
                              <div className="relative flex h-full w-full translate-y-20 transform cursor-pointer items-center justify-center bg-white transition delay-200 duration-300 group-hover:translate-y-0">
                                 {cart.cartItems.find(
                                    (cartItem) => cartItem._id === book?._id
                                 ) ? (
                                    <div className="flex h-full w-full items-center justify-center gap-7 bg-custom-orange">
                                       <button
                                          onClick={() =>
                                             dispatch(decreaseCart(book))
                                          }
                                       >
                                          <AiOutlineMinus
                                             size={20}
                                             className="cursor-pointer rounded-full bg-white p-1 text-black hover:text-custom-orange"
                                          />
                                       </button>
                                       <p className="text-lg font-bold text-white">
                                          {
                                             cart.cartItems.find(
                                                (cartItem) =>
                                                   cartItem._id === book?._id
                                             ).cartQuantity
                                          }
                                       </p>
                                       <button
                                          onClick={() =>
                                             dispatch(incrementCart(book))
                                          }
                                       >
                                          <AiOutlinePlus
                                             size={20}
                                             className="cursor-pointer rounded-full bg-white p-1 text-black hover:text-custom-orange"
                                          />
                                       </button>
                                    </div>
                                 ) : (
                                    <button
                                       onClick={() => {
                                          if (book?.countInStock === 0) {
                                             enqueueSnackbar(
                                                "Contact us for product request",
                                                { variant: "warning" }
                                             )
                                          } else {
                                             enqueueSnackbar(
                                                `${book?.title?.substr(
                                                   0,
                                                   20
                                                )} was added to the shopping cart.`,
                                                { variant: "success" }
                                             )
                                             dispatch(addToCart(book))
                                          }
                                       }}
                                       className="bg-custom-dark flex h-full w-full cursor-pointer items-center justify-center gap-1.5 text-base font-semibold text-white hover:bg-custom-orange"
                                    >
                                       <BsMinecartLoaded size={15} />
                                       <span>Add to cart</span>
                                    </button>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
            <button
               onClick={handleRightArrow}
               className="group absolute -right-1.5 top-[40%] z-10"
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

export default AwardedBooks
