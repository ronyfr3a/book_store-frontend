import React from "react"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

const Summary = ({ itemsPrice, shippingCost, totalCost, subtotal }) => {
   const location = useLocation()

   let finalShippingCost = shippingCost,
      finalItemPrice = itemsPrice,
      finalTotal = totalCost,
      finalSubtotal = subtotal
   const carts = useSelector((state) => state.cart)

   if (location.pathname === "/cart") {
      finalItemPrice = carts?.cartItems?.reduce(
         (acc, item) =>
            item?.discount === 0
               ? acc + item?.price * item?.cartQuantity
               : acc + Math.round(item?.discountedPrice) * item?.cartQuantity,
         0
      )
      finalShippingCost = 40
      finalTotal = finalItemPrice + finalShippingCost
      finalSubtotal = finalTotal
   }

   return (
      <div className="flex w-full flex-col">
         <div className="rounded-md  border bg-white p-4">
            <p className="text-base font-bold">Summary</p>
            <hr className="my-1" />
            <ul className="my-2 flex w-full flex-col space-y-2">
               <li className="flex w-full items-center justify-between">
                  <p className="text-base">Cost</p>
                  <p className="RP text-base font-semibold">
                     Tk. {finalItemPrice}
                  </p>
               </li>
               <li className="flex w-full items-center justify-between">
                  <p className="text-base">Shipping</p>
                  <p className="RP text-base font-semibold">
                     Tk. {finalShippingCost}
                  </p>
               </li>
               <li className="flex w-full items-center justify-between">
                  <p className="text-base">Total </p>
                  <p className="RP text-base font-semibold">Tk. {finalTotal}</p>
               </li>
               <hr className="mb-2 mt-0.5" />
               <li className="flex w-full items-center justify-between">
                  <p className="text-base font-semibold">Subtotal</p>
                  <p className="RP text-base font-semibold">
                     Tk.{Math.round(finalSubtotal)}
                  </p>
               </li>
               <hr />
            </ul>
         </div>
      </div>
   )
}

export default Summary
