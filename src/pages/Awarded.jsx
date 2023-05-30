import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Card from "../components/card/Card"
import PulseLoader from "react-spinners/PulseLoader"
import { Drawer } from "rsuite"

import axios from "axios"
import { BiSort } from "react-icons/bi"
import { useGetBooksQuery } from "../services/awarded"

const Awarded = () => {
   const { data: awarded, error, isLoading } = useGetBooksQuery()

   const [priceFrom, setpriceFrom] = useState(0)
   const [priceTo, setpriceTo] = useState(5000)
   const [order, setorder] = useState("")
   const [open, setOpen] = useState(false)
   const [products, setProducts] = useState([])
   const [productCount, setproductCount] = useState(60)

   const handleProductCount = (e) => {
      e.preventDefault()
      if (products?.length >= productCount) {
         setproductCount(products?.length)
      } else {
         setproductCount(productCount + 60)
      }
   }

   const handleOpen = () => {
      setOpen(true)
      setpriceFrom(0)
      setpriceTo(5000)
      setorder("")
      setAcc(0)
   }
   const [acc, setAcc] = useState(0)

   const resetAll = () => {
      if (isLoading === true) {
         setOpen(false)
         setProducts([])
      } else {
         setOpen(false)
         setProducts(awarded?.products)
         setpriceFrom(0)
         setpriceTo(5000)
         setorder("")
         setAcc(0)
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      setOpen(false)
      const { data } = await axios.get(
         `https://free-book-ronyfr3-api.onrender.com/api/general/all?sort=${order
            ?.replace(/\s+/g, " ")
            ?.trim()}&discountedPrice[gte]=${priceFrom}&discountedPrice[lte]=${priceTo}`
      )
      setProducts(data?.products)
      setproductCount(data?.products?.length)
   }

   useEffect(() => {
      setProducts(awarded?.products)
   }, [awarded])

   return (
      <div
         className={
            isLoading
               ? "mx-auto my-10 min-h-screen w-full max-w-7xl bg-white p-3.5 px-2.5 md:p-5 md:px-6"
               : "mx-auto my-10 w-full max-w-7xl bg-white p-3.5 px-2.5 md:p-5 md:px-6"
         }
      >
         <div className="mb-5 flex items-center gap-1 text-sm">
            <Link to="/">Home</Link>
            <span>Awarded Books</span>
         </div>
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-xl font-bold tracking-tight text-custom-orange">
                  Awarded Books
               </h1>
               <p className="text-sm text-gray-500">
                  (Showing {!awarded?.products?.length ? 0 : productCount} of{" "}
                  {products?.length || 0} items)
               </p>
            </div>
            <button
               onClick={handleOpen}
               className="flex cursor-pointer items-center justify-center gap-1.5 border px-4 py-1.5"
            >
               <span className="flex items-center text-sm font-medium">
                  <BiSort size={18} /> Select Filter
               </span>
               <svg
                  xmlns="http://www.w3.org/600/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
               </svg>
            </button>
            <Drawer
               size={"xs"}
               placement="right"
               open={open}
               onClose={() => setOpen(false)}
            >
               <Drawer.Body>
                  <div className="flex flex-col gap-5">
                     <div className="flex w-full flex-col">
                        <p className="mb-2 text-base font-bold text-custom-orange">
                           Sort
                        </p>
                        <div className="mb-2.5 flex items-center">
                           <input
                              id="newest"
                              type="radio"
                              name="order"
                              value="-createdAt"
                              onChange={(e) => setorder(e.target.value)}
                              className="h-4 w-4 border-gray-300 bg-gray-100 text-orange-600 focus:ring-2 focus:ring-orange-500"
                           />
                           <label
                              htmlFor="newest"
                              className="ml-2 cursor-pointer text-sm font-medium dark:text-gray-300"
                           >
                              Newest
                           </label>
                        </div>
                        <div className="mb-2.5 flex items-center">
                           <input
                              id="priceLH"
                              type="radio"
                              name="order"
                              value="price"
                              onChange={(e) => setorder(e.target.value)}
                              className="h-4 w-4 border-gray-300 bg-gray-100 text-orange-600 focus:ring-2 focus:ring-orange-500"
                           />
                           <label
                              htmlFor="priceLH"
                              className="ml-2 cursor-pointer text-sm font-medium dark:text-gray-300"
                           >
                              Price: Low to high
                           </label>
                        </div>
                        <div className="mb-2.5 flex items-center">
                           <input
                              id="priceHL"
                              type="radio"
                              name="order"
                              value="-price"
                              onChange={(e) => setorder(e.target.value)}
                              className="h-4 w-4 border-gray-300 bg-gray-100 text-orange-600 focus:ring-2 focus:ring-orange-500"
                           />
                           <label
                              htmlFor="priceHL"
                              className="ml-2 cursor-pointer text-sm font-medium dark:text-gray-300"
                           >
                              Price: High to low
                           </label>
                        </div>
                        <div className="mb-2.5 flex items-center">
                           <input
                              id="ratingH"
                              type="radio"
                              name="order"
                              value="-rating"
                              onChange={(e) => setorder(e.target.value)}
                              className="h-4 w-4 border-gray-300 bg-gray-100 text-orange-600 focus:ring-2 focus:ring-orange-500"
                           />
                           <label
                              htmlFor="ratingH"
                              className="ml-2 cursor-pointer text-sm font-medium dark:text-gray-300"
                           >
                              Rating: High to low
                           </label>
                        </div>
                        <div className="mb-2.5 flex items-center">
                           <input
                              id="ratingL"
                              type="radio"
                              name="order"
                              value="rating"
                              onChange={(e) => setorder(e.target.value)}
                              className="h-4 w-4 border-gray-300 bg-gray-100 text-orange-600 focus:ring-2 focus:ring-orange-500"
                           />
                           <label
                              htmlFor="ratingL"
                              className="ml-2 cursor-pointer text-sm font-medium dark:text-gray-300"
                           >
                              Rating: Low to high
                           </label>
                        </div>
                     </div>
                     <div className="flex w-full flex-col">
                        <p className="mb-2 text-base font-bold text-custom-orange">
                           Price Range
                        </p>
                        <div className="flex gap-2">
                           <div className="flex w-1/2 flex-col gap-1">
                              <span>From</span>
                              <input
                                 type="number"
                                 name="priceFrom"
                                 value={priceFrom}
                                 onChange={(e) => setpriceFrom(e.target.value)}
                                 placeholder="From"
                                 className="border-gray-60 w-full rounded-md shadow-sm sm:text-sm"
                              />
                           </div>
                           <div className="flex w-1/2 flex-col gap-1">
                              <span>To</span>
                              <input
                                 type="number"
                                 name="priceTo"
                                 value={priceTo}
                                 onChange={(e) => setpriceTo(e.target.value)}
                                 placeholder="To"
                                 className="border-gray-60 w-full rounded-md shadow-sm sm:text-sm"
                              />
                           </div>
                        </div>
                     </div>
                     <div className="mt-5 flex w-full flex-col items-center justify-between gap-3">
                        <button
                           onClick={handleSubmit}
                           className="w-full border bg-orange-500 px-6 py-2 font-medium text-white"
                        >
                           Apply
                        </button>
                        <button
                           onClick={resetAll}
                           className="w-full border px-6 py-2 font-medium"
                        >
                           Reset all
                        </button>
                     </div>
                  </div>
               </Drawer.Body>
            </Drawer>
         </div>
         {isLoading && (
            <div className="flex items-center justify-center p-20">
               <PulseLoader
                  color="gray"
                  loading={isLoading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
               />
            </div>
         )}
         <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2 md:gap-8">
            {products?.length === 0 ? (
               <p>No products found!</p>
            ) : (
               <>
                  {products?.slice(0, productCount)?.map((item, i) => (
                     <div key={i}>
                        <Card item={item} />
                     </div>
                  ))}
               </>
            )}
         </div>
         <div className="mt-5 flex w-full items-center justify-center">
            {products?.length === 0 && (
               <img src="/npf.png" alt="" className="w-36 md:w-48" />
            )}
         </div>
         <div
            className={
               error ||
               isLoading ||
               products?.length === 0 ||
               productCount >= products?.length
                  ? "hidden"
                  : "my-5 flex items-center justify-center"
            }
         >
            <button
               onClick={handleProductCount}
               className="bg-custom-orange px-6 py-2 text-white"
            >
               Load more
            </button>
         </div>
      </div>
   )
}

export default Awarded
