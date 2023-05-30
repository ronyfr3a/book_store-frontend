import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { shoppingCardAction } from "../../services/shoppingCardSlice"

const Cart = () => {
   const dispatch = useDispatch()

   const { cartItems } = useSelector((state) => state.cart)

   const totalQuantity = cartItems?.map(
      (item) => item?.price * item?.cartQuantity
   )
   const totalAmount = totalQuantity?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
   )
   const handleOpen = () => {
      dispatch(shoppingCardAction(true))
   }
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   return (
      <>
         <button onClick={() => handleOpen()} className="relative">
            <div className="fixed bottom-2/4 right-0 top-2/4 z-30 float-right hidden w-24 cursor-pointer align-middle shadow-lg lg:block xl:block">
               <div className="H1 flex flex-col items-center justify-center rounded-tl-lg bg-gray-100 p-2">
                  <span className="mb-1 text-2xl text-custom-orange">
                     <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           fill="none"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="32"
                           d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
                        ></path>
                        <path
                           fill="none"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="32"
                           d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16"
                        ></path>
                     </svg>
                  </span>
                  <span className="px-2 text-sm  font-medium">
                     {cartItems?.length > 1 ? (
                        <span>{cartItems?.length} Items</span>
                     ) : (
                        <span>{cartItems?.length} Item</span>
                     )}
                  </span>
               </div>
               <div className="mx-auto flex flex-col items-center justify-center rounded-bl-lg bg-custom-orange p-2  text-base font-medium text-white">
                  Tk. {totalAmount}
               </div>
            </div>
         </button>
      </>
   )
}

export default Cart
