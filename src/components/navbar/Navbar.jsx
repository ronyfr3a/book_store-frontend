import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
   AiOutlineHeart,
   AiOutlineMinus,
   AiOutlinePlus,
   AiOutlineDelete,
} from "react-icons/ai"
import { MdOutlineManageAccounts } from "react-icons/md"
import { HiOutlineShoppingBag } from "react-icons/hi"
import { BsMinecartLoaded, BsPerson } from "react-icons/bs"
import { Popover, Whisper, Modal } from "rsuite"
import { useSelector, useDispatch } from "react-redux"
import { useSearchBooksQuery } from "../../services/search"
import {
   decreaseCart,
   getTotals,
   removeFromCart,
   incrementCart,
} from "../../services/cart"

const Navbar = () => {
   const dispatch = useDispatch()
   const [open, setOpen] = useState(false)

   const handleOpen = () => setOpen(!open)
   const handleClose = () => setOpen(false)

   const [search, setSearch] = useState("")

   const handleChange = (e) => {
      e.preventDefault()
      setSearch(e.target.value)
   }
   const { data: results } = useSearchBooksQuery(search)

   const carts = useSelector((state) => state?.cart)

   const handleClearCart = () => {
      localStorage.removeItem("cartItems")
      window.location.reload()
   }

   const totalQuantity = carts?.cartItems?.map(
      (item) => item?.price * item?.cartQuantity
   )
   const totalAmount = totalQuantity?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
   )

   const CartPopup = (
      <Popover>
         {!carts?.cartItems?.length ? (
            <p>Empty Carts</p>
         ) : (
            <div className="flex w-80 flex-col items-center justify-center p-2">
               <div className="flex w-full flex-col">
                  {carts?.cartItems?.map((data, index) => (
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
                              {data?.title?.substr(0, 20)}
                           </Link>
                           <div className="flex items-center justify-between">
                              <span className="text-base font-semibold text-custom-green">
                                 Tk. {data?.price}
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
                     className="my-2 text-sm text-custom-hot"
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
                        className="flex items-center justify-center rounded bg-custom-orange px-4 py-1.5 text-center text-base"
                     >
                        View Cart
                     </Link>
                     <Link
                        to="/checkout"
                        className="flex items-center justify-center rounded bg-custom-orange px-4 py-1.5 text-center text-base"
                     >
                        Checkout
                     </Link>
                  </div>
               </div>
            </div>
         )}
      </Popover>
   )

   const accountPopup = (
      <Popover>
         <div className="flex w-64 flex-col items-start gap-2.5 p-2">
            <Link
               to="/"
               className="item-center flex gap-1 text-base font-semibold"
            >
               <MdOutlineManageAccounts size={20} />{" "}
               <span>Account Settings</span>
            </Link>
            <Link
               to="/"
               className="item-center flex gap-1 text-base font-semibold"
            >
               <HiOutlineShoppingBag size={20} />
               <span>My Orders</span>
            </Link>
            <button className="mt-2 bg-custom-orange px-4 py-1">Logout</button>
         </div>
      </Popover>
   )

   useEffect(() => {
      dispatch(getTotals())
   }, [carts, dispatch])

   return (
      <>
         {/* Top */}
         <div className="relative w-full bg-custom-orange py-3.5">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-2.5 md:px-6">
               <div>
                  <ul className="flex items-center gap-5 text-sm md:text-base">
                     <li className="cursor-pointer">Home</li>
                     <li className="cursor-pointer">FAQs</li>
                     <li className="cursor-pointer">Contact</li>
                  </ul>
               </div>
               <div className="flex items-center gap-5 text-sm md:text-base">
                  <span className="cursor-pointer" onClick={handleOpen}>
                     Track your order
                  </span>
                  <Modal size="sm" open={open} onClose={handleClose}>
                     <div className="p-2">
                        <div className="mb-5 flex flex-col items-center justify-center">
                           <h1 className="text-lg font-semibold">
                              Order Tracking
                           </h1>
                           <p className="mt-4 text-base">
                              Tracking your order status
                           </p>
                        </div>
                        <form>
                           <div className="mb-5">
                              <label
                                 htmlFor="email"
                                 className="mb-2 block text-sm font-medium text-gray-900"
                              >
                                 Order ID*
                              </label>
                              <input
                                 type="text"
                                 className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-gray-500"
                                 placeholder="Order ID"
                                 required
                              />
                           </div>
                           <div className="mb-5">
                              <label
                                 htmlFor="email"
                                 className="mb-2 block text-sm font-medium text-gray-900"
                              >
                                 Email Address*
                              </label>
                              <input
                                 type="email"
                                 id="email"
                                 className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-gray-500"
                                 placeholder="Your email"
                                 required
                              />
                           </div>
                           <button
                              type="submit"
                              className="w-full rounded bg-custom-orange px-5 py-2.5 text-center text-base font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-300"
                           >
                              Find
                           </button>
                        </form>
                     </div>
                  </Modal>

                  <Whisper
                     placement="bottom"
                     trigger="hover"
                     controlId="control-id-hover-enterable"
                     speaker={accountPopup}
                     enterable
                  >
                     <span className="cursor-pointer text-sm md:text-base">
                        My Account
                     </span>
                  </Whisper>
               </div>
            </div>
         </div>
         {/* Bottom */}
         <div className="w-full border-b bg-white py-5">
            <div className="mx-auto max-w-7xl px-2.5 md:px-6">
               <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                  <Link to="/">
                     <h1 className="text-xl font-bold">Book Store</h1>
                  </Link>
                  <div className="flex items-center gap-10">
                     <div className="relative flex h-10 items-center justify-between rounded shadow">
                        <select className="h-10 w-[75px] border-b-0 border-l-0 border-r border-t-0 border-gray-300 outline-none focus:border-gray-300 focus:ring-0">
                           <option selected>All</option>
                           <option value="US">Nominated Books</option>
                           <option value="CA">Awarded Books</option>
                           <option value="FR">Popular Books</option>
                        </select>
                        <input
                           type="text"
                           name="search"
                           value={search}
                           onChange={handleChange}
                           className="h-10 border-none outline-none focus:border-none focus:ring-0 md:w-[500px]"
                           placeholder="I'm shopping for..."
                           required
                        />
                        <button className="h-10 bg-custom-orange px-4 text-white">
                           Search
                        </button>
                        {search && (
                           <div className="scroll_content absolute left-0 top-10 z-50 flex h-max max-h-56 w-full flex-col overflow-y-auto border-b-4 border-custom-orange bg-white p-2.5 shadow">
                              <span className="mb-2 text-gray-400">
                                 {results?.length || 0} results found
                              </span>
                              {!results?.length && (
                                 <p className="py-5 text-center">
                                    Try another search!
                                 </p>
                              )}
                              {results?.map((x, i) => {
                                 return (
                                    <Link
                                       key={i}
                                       to={`/product/${x?._id}`}
                                       onClick={() => setSearch("")}
                                    >
                                       <p className="px-0.5 py-2 text-sm hover:bg-gray-100">
                                          {x?.title?.length > 30
                                             ? x?.title.substr(0, 30)
                                             : x?.title}
                                          {x?.title?.length > 30 && "..."}
                                       </p>
                                    </Link>
                                 )
                              })}
                           </div>
                        )}
                     </div>
                     <div className="hidden items-center gap-10 md:flex">
                        <Link to="/" className="relative">
                           <AiOutlineHeart
                              size={35}
                              className="text-custom-orange"
                           />
                           <span className="absolute -right-1.5 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-sm text-white">
                              5
                           </span>
                        </Link>
                        <Whisper
                           placement="bottom"
                           trigger="hover"
                           controlId="control-id-hover-enterable"
                           speaker={CartPopup}
                           enterable
                        >
                           <Link to="/cart" className="relative">
                              <BsMinecartLoaded
                                 size={28}
                                 className="text-custom-orange"
                              />
                              <span className="absolute -right-1.5 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-sm text-white">
                                 {carts?.cartItems?.length || 0}
                              </span>
                           </Link>
                        </Whisper>
                        <Link to="/" className="flex items-center gap-2">
                           <BsPerson size={35} className="text-custom-orange" />
                           <div className="flex flex-col leading-5">
                              <span className="font-semibold hover:text-custom-orange">
                                 <Link to="/">Login</Link>
                              </span>
                              <span className="font-semibold hover:text-custom-orange">
                                 <Link to="/">Register</Link>
                              </span>
                           </div>
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Navbar
