import React, { useEffect } from "react"
import CartProduct from "./CartProduct"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const CartScreen = () => {
   const naviagate = useNavigate()
   const carts = useSelector((state) => state.cart)

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   return (
      <div className="mx-auto my-10 max-w-7xl bg-white px-2.5 shadow md:px-6">
         {carts?.cartItems?.length === 0 ? (
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
                  <button
                     onClick={() => naviagate("/")}
                     className="mt-5 rounded-md bg-custom-orange px-4 py-1.5 text-white"
                  >
                     Back to home
                  </button>
               </div>
            </div>
         ) : (
            <div className="w-full py-5">
               <CartProduct />
            </div>
         )}
      </div>
   )
}

export default CartScreen
