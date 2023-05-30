import { Link } from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai"
import { BiCategory } from "react-icons/bi"
import DrawerCart from "../../utils/DrawerCart"
import { openDrawer } from "../../services/cartDrawer"
import { useDispatch, useSelector } from "react-redux"

const FooterHeader = () => {
   const dispatch = useDispatch()
   const open = useSelector((state) => state.drawer.value)

   return (
      <footer className="fixed bottom-0 z-30 flex h-14 w-full items-center justify-between border-t-2 bg-white px-5 sm:px-10 lg:hidden">
         {open && <DrawerCart />}
         <Link to="/" className="flex flex-col items-center justify-center">
            <AiOutlineHome className="text-2xl text-gray-500" />
            <span className="text-xs text-gray-500">Home</span>
         </Link>
         <button className="relative flex flex-col items-center justify-center focus:outline-none">
            <BiCategory className="text-2xl text-gray-500" />
            <span className="text-xs text-gray-500">Categories</span>
         </button>
         <button
            onClick={() => dispatch(openDrawer(true))}
            aria-label="Total"
            className="relative flex flex-col items-center justify-center"
         >
            <div>
               <span className="absolute -right-4 top-1.5 z-10 inline-flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-custom-orange p-1 text-xs font-medium leading-none text-white">
                  3
               </span>
               <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-gray-500"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
               </svg>
            </div>
            <span className="text-xs text-gray-500">Cart</span>
         </button>
      </footer>
   )
}

export default FooterHeader
