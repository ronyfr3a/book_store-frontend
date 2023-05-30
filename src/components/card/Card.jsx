import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AiOutlineMinus, AiOutlinePlus, AiFillEye } from "react-icons/ai"
import { BsMinecartLoaded } from "react-icons/bs"
import { SnackbarProvider, enqueueSnackbar } from "notistack"

import { addToCart, decreaseCart, incrementCart } from "../../services/cart"
import LazyLoad from "../../utils/LazyLoad"

const Card = ({ item }) => {
   const cart = useSelector((state) => state.cart)
   const dispatch = useDispatch()

   const handleWishlist = (e, item) => {
      e.preventDefault()
      enqueueSnackbar(
         `Wishlist was updated for ${item?.title?.substr(0, 20)}`,
         {
            variant: "success",
            autoHideDuration: 1000,
            preventDuplicate: true,
         }
      )
   }

   return (
      <div className="group relative flex h-80 w-32 flex-col items-center overflow-hidden border border-gray-200 bg-white hover:border-gray-500 xs:w-[154px] ms:w-44 md:h-96 md:w-52">
         <SnackbarProvider
            preventDuplicate
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "right",
            }}
         />
         {/* IMAGE */}
         <div className="relative h-full w-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full">
               <LazyLoad
                  imgUrl={item?.images[0]}
                  imgAlt={item?.title}
                  className="h-full w-full object-contain md:h-[300px] md:object-cover"
               />
            </div>
            <ul className="absolute right-2 top-1">
               <li
                  onClick={(e) => handleWishlist(e, item)}
                  className=" relative my-1.5 flex h-10 w-10 translate-x-20 transform cursor-pointer list-none items-center justify-center bg-white transition duration-300 group-hover:translate-x-0"
               >
                  <p className="text-xl hover:text-custom-orange">&#x2764;</p>
               </li>
               <li className=" relative my-1.5 flex h-10 w-10 translate-x-20 transform cursor-pointer list-none items-center justify-center bg-white transition delay-100 duration-300 group-hover:translate-x-0">
                  <Link to={`/product/${item?._id}`}>
                     <AiFillEye
                        size={24}
                        className="hover:text-custom-orange"
                     />
                  </Link>
               </li>
            </ul>
            <div className="absolute left-2 top-0 h-10 w-10">
               {item?.countInStock === 0 ? (
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
                  {item?.title?.length > 20
                     ? item?.title.substr(0, 20)
                     : item?.title}
                  {item?.title?.length > 20 && "..."}
               </p>
               <p className="-mt-1 px-2">
                  <span className="text-xs text-custom-blue">
                     by{" "}
                     {item?.author?.name?.length > 20
                        ? item?.author?.name?.substr(0, 20)
                        : item?.author?.name}
                     {item?.author?.name?.length > 20 && "..."}
                  </span>
               </p>
               {/* RATING */}
               <div className="flex w-full items-center justify-center">
                  <span className="mr-0.5">
                     <i
                        className={
                           item?.rating >= 1
                              ? "fas fa-star text-custom-yellow"
                              : item?.rating >= 0.5
                              ? "fas fa-star-half-alt text-custom-yellow"
                              : "far fa-star text-custom-yellow"
                        }
                     ></i>
                  </span>
                  <span className="mr-0.5">
                     <i
                        className={
                           item?.rating >= 2
                              ? "fas fa-star text-custom-yellow"
                              : item?.rating >= 1.5
                              ? "fas fa-star-half-alt text-custom-yellow"
                              : "far fa-star text-custom-yellow"
                        }
                     ></i>
                  </span>
                  <span className="mr-0.5">
                     <i
                        className={
                           item?.rating >= 3
                              ? "fas fa-star text-custom-yellow"
                              : item?.rating >= 2.5
                              ? "fas fa-star-half-alt text-custom-yellow"
                              : "far fa-star text-custom-yellow"
                        }
                     ></i>
                  </span>
                  <span className="mr-0.5">
                     <i
                        className={
                           item?.rating >= 4
                              ? "fas fa-star text-custom-yellow"
                              : item?.rating >= 3.5
                              ? "fas fa-star-half-alt text-custom-yellow"
                              : "far fa-star text-custom-yellow"
                        }
                     ></i>
                  </span>
                  <span className="mr-0.5">
                     <i
                        className={
                           item?.rating >= 5
                              ? "fas fa-star text-custom-yellow"
                              : item?.rating >= 4.5
                              ? "fas fa-star-half-alt text-custom-yellow"
                              : "far fa-star text-custom-yellow"
                        }
                     ></i>
                  </span>
                  <span className="ml-0.5 text-gray-600">
                     ({item?.numReviews})
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
                     In stock: {item?.countInStock}
                  </span>
               </div>
            </div>

            {/* PRICE & DISCOUNT */}
            <div
               className={
                  item?.discount === 0
                     ? "mb-2 flex w-full items-center justify-center px-2.5"
                     : "mb-2 flex w-full items-center justify-between px-2.5"
               }
            >
               <div className="flex flex-col items-center justify-center text-center">
                  {item?.discount === 0 ? (
                     <span className="text-base font-semibold text-custom-dark">
                        Tk. {item?.price}
                     </span>
                  ) : (
                     <div className="flex flex-col items-start justify-start gap-1.5 md:flex-row md:items-center md:justify-center">
                        <span className="text-xs font-semibold text-custom-green md:text-base">
                           TK. {Math.round(item?.discountedPrice)}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 line-through">
                           TK. {item?.price}
                        </span>
                     </div>
                  )}
               </div>
               {item?.discount === 0 ? null : (
                  <p className="rounded-md bg-custom-hot px-2 py-1 text-xs font-semibold text-white">
                     {Math.ceil(item?.discount)}% OFF
                  </p>
               )}
            </div>

            {/* CART */}
            <div className="absolute bottom-0 h-9 w-full">
               <div className="relative flex h-full w-full translate-y-20 transform cursor-pointer items-center justify-center bg-white transition delay-200 duration-300 group-hover:translate-y-0">
                  {cart.cartItems.find(
                     (cartItem) => cartItem._id === item?._id
                  ) ? (
                     <div className="flex h-full w-full items-center justify-center gap-7 bg-custom-orange">
                        <button onClick={() => dispatch(decreaseCart(item))}>
                           <AiOutlineMinus
                              size={20}
                              className="cursor-pointer rounded-full bg-white p-1 text-black hover:text-custom-orange"
                           />
                        </button>
                        <p className="text-lg font-bold text-white">
                           {
                              cart.cartItems.find(
                                 (cartItem) => cartItem._id === item?._id
                              ).cartQuantity
                           }
                        </p>
                        <button onClick={() => dispatch(incrementCart(item))}>
                           <AiOutlinePlus
                              size={20}
                              className="cursor-pointer rounded-full bg-white p-1 text-black hover:text-custom-orange"
                           />
                        </button>
                     </div>
                  ) : (
                     <button
                        onClick={() => {
                           if (item?.countInStock === 0) {
                              enqueueSnackbar(
                                 "Contact us for product request",
                                 { variant: "warning" }
                              )
                           } else {
                              enqueueSnackbar(
                                 `${item?.title?.substr(
                                    0,
                                    20
                                 )} was added to the shopping cart.`,
                                 { variant: "success" }
                              )
                              dispatch(addToCart(item))
                           }
                        }}
                        className="flex h-full w-full cursor-pointer items-center justify-center gap-1.5 bg-custom-dark text-base font-semibold text-white hover:bg-custom-orange"
                     >
                        <BsMinecartLoaded size={15} />
                        <span>Add to cart</span>
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Card
