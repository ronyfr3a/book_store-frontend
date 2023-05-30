import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Drawer } from "rsuite"
import { useSelector, useDispatch } from "react-redux"
import { openDrawer } from "../services/cartDrawer"
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai"

import {
   decreaseCart,
   getTotals,
   incrementCart,
   removeFromCart,
} from "../services/cart"

const DrawerCart = () => {
   const dispatch = useDispatch()
   const open = useSelector((state) => state.drawer.value)

   const cart = useSelector((state) => state.cart)

   const totalQuantity = cart?.cartItems?.map((item) =>
      item?.discount === 0
         ? item?.price * item?.cartQuantity
         : Math.round(item?.discountedPrice * item?.cartQuantity)
   )
   const totalAmount = totalQuantity?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
   )

   const handleClearCart = () => {
      localStorage.removeItem("cartItems")
      window.location.reload()
   }

   useEffect(() => {
      dispatch(getTotals())
   }, [cart, dispatch])

   return (
      <Drawer
         size={"xs"}
         placement="right"
         open={open}
         onClose={() => dispatch(openDrawer(false))}
      >
         {!cart?.cartItems?.length ? (
            <div className="flex h-full flex-col justify-center bg-white py-10">
               <div className="flex flex-col items-center">
                  <img
                     src="https://cdn-icons-png.flaticon.com/128/2762/2762885.png"
                     alt=""
                  />
                  <h3 className="RP pt-2 text-lg font-semibold">
                     Your cart is empty
                  </h3>
                  <p className="RT px-12 pt-2 text-center text-sm">
                     No items added in your cart. Please add product to your
                     cart list.
                  </p>
                  <Link
                     to="/"
                     className="mt-5 rounded-md bg-custom-orange px-4 py-1.5 text-white"
                  >
                     Back to home
                  </Link>
               </div>
            </div>
         ) : (
            <div className="flex w-full flex-col items-center justify-between p-6">
               {/* product */}
               <div className="flex w-full flex-col">
                  {cart?.cartItems?.map((data, index) => (
                     <div
                        key={index}
                        className="group relative flex h-auto w-full  items-center justify-start border-b border-gray-100 bg-white px-4 py-3 transition-all last:border-b-0 hover:bg-gray-50"
                     >
                        <div className="mr-2.5 flex h-12 w-12 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-100 shadow-sm">
                           <img
                              src={data?.images?.[0]}
                              alt={data?.title}
                              className="h-full w-full object-cover"
                           />
                        </div>
                        <div className="flex w-full flex-col overflow-hidden">
                           <Link
                              className="line-clamp-1 truncate text-sm font-medium no-underline hover:text-custom-orange"
                              to={`/product/${data?._id}`}
                           >
                              {data?.name?.substr(0, 20)}
                           </Link>
                           <div className="flex items-center justify-between">
                              <span className="text-base font-semibold text-custom-green">
                                 Tk.{data?.price}
                              </span>

                              <div className="w-22 RT flex h-8 flex-wrap items-center justify-evenly rounded-md border border-gray-100 bg-white p-1 md:w-24 lg:w-24">
                                 <button
                                    onClick={() => dispatch(decreaseCart(data))}
                                 >
                                    <AiOutlineMinus size={15} />
                                 </button>
                                 <p className="text-dark px-1 text-sm font-semibold">
                                    {data?.cartQuantity}
                                 </p>
                                 <button
                                    onClick={() =>
                                       dispatch(incrementCart(data))
                                    }
                                 >
                                    <AiOutlinePlus size={15} />
                                 </button>
                              </div>
                              <button
                                 onClick={() => dispatch(removeFromCart(data))}
                                 className="cursor-pointer text-lg text-red-400 hover:text-red-600"
                              >
                                 <AiOutlineDelete size={20} />
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
                  <button
                     className="mt-3 rounded bg-custom-orange px-4 py-1.5 text-white"
                     onClick={handleClearCart}
                  >
                     Clear All
                  </button>
               </div>
               {/* total and checkout */}
               <div className="w-full">
                  <div className="flex items-center justify-between">
                     <p className="text-base font-bold">Total:</p>
                     <p className="text-base font-bold">{totalAmount}</p>
                  </div>
                  <hr className="my-2" />
                  <div className="flex items-center justify-between">
                     <Link
                        to="/cart"
                        onClick={() => dispatch(openDrawer(false))}
                        className="flex items-center justify-center rounded bg-custom-orange px-4 py-1.5 text-center text-base"
                     >
                        View Cart
                     </Link>
                     <Link
                        to="/checkout"
                        onClick={() => dispatch(openDrawer(false))}
                        className="flex items-center justify-center rounded bg-custom-orange px-4 py-1.5 text-center text-base"
                     >
                        Checkout
                     </Link>
                  </div>
               </div>
            </div>
         )}
      </Drawer>
   )
}

export default DrawerCart
