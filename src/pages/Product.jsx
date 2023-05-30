import { useGetBookQuery } from "../services/book"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import { openDrawer } from "../services/cartDrawer"
import { addToCart, decreaseCart, incrementCart } from "../services/cart"
import DrawerCart from "../utils/DrawerCart"
import PulseLoader from "react-spinners/PulseLoader"

const Product = () => {
   const dispatch = useDispatch()
   const { id } = useParams()
   const { data, isLoading } = useGetBookQuery(id)

   const open = useSelector((state) => state.drawer.value)
   const cart = useSelector((state) => state.cart)

   const handleCart = (book) => {
      dispatch(addToCart(book))
      enqueueSnackbar(`${book?.name?.substr(0, 20)} was added to cart`, {
         variant: "success",
         autoHideDuration: 1000,
         preventDuplicate: true,
      })
      dispatch(openDrawer(true))
   }

   return (
      <div className="my-10 bg-white px-2.5 md:px-6">
         <SnackbarProvider
            preventDuplicate
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "right",
            }}
         />
         {open && <DrawerCart />}

         {isLoading ? (
            <div className="flex items-center justify-center p-20">
               <PulseLoader
                  color="gray"
                  loading={isLoading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
               />
            </div>
         ) : (
            <div className="flex flex-wrap p-5 w-full">
               <img
                  src={data?.images[0]}
                  alt={data?.title}
                  className="w-full rounded border border-gray-200 object-cover object-center md:w-56"
               />
               <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
                  <h2 className="text-xl text-gray-500">{data?.title}</h2>
                  <h1 className="my-1 text-sm font-medium text-custom-blue">
                     {data?.author?.name}
                  </h1>
                  <h1 className="my-2 text-sm text-gray-400">
                     {data?.author?.description.substr(0, 300)}
                  </h1>

                  <div className="mt-3 flex items-center justify-start">
                     {data?.discount === 0 ? (
                        <span className="text-xl font-semibold">
                           Tk. {data?.price}
                        </span>
                     ) : (
                        <div className="flex flex-col items-start justify-start">
                           <div className="flex flex-col">
                              <div className="flex items-center justify-start gap-2">
                                 <span className="text-base font-semibold">
                                    TK. {Math.round(data?.discountedPrice)}
                                 </span>
                                 <span className="text-sm text-gray-500">
                                    You Save TK.{" "}
                                    {Math.round(
                                       data?.price - data?.discountedPrice
                                    )}{" "}
                                    ({data?.discount}%)
                                 </span>
                              </div>
                              <span className="text-sm font-semibold text-custom-hot line-through">
                                 TK. {data?.price}
                              </span>
                           </div>
                        </div>
                     )}
                  </div>
                  <div className="my-2">
                     {data?.countInStock === 0 ? (
                        <p className="font-semibold text-custom-hot">
                           Out of stock
                        </p>
                     ) : data?.countInStock < 5 ? (
                        <p className="font-semibold text-custom-green">
                           In stock{" "}
                           <span className="ml-1 text-sm  text-custom-hot">
                              (Only {data?.countInStock} copies left!)
                           </span>
                        </p>
                     ) : data?.countInStock > 25 ? (
                        <p className="font-semibold text-custom-green">
                           In stock{" "}
                           <span className="RT ml-1 text-sm ">
                              (25+ copies available)
                           </span>
                        </p>
                     ) : (
                        <p className="font-semibold text-custom-green">
                           In stock{" "}
                           <span className="RT ml-1 text-sm ">
                              ({data?.countInStock} copies available)
                           </span>
                        </p>
                     )}
                  </div>
                  <div className="flex w-max items-center justify-between rounded-sm bg-gray-200 px-2 py-2.5">
                     <p className="H1 text-sm font-semibold">Quantity</p>
                     <div className="flex items-center px-2">
                        <button
                           onClick={() => dispatch(decreaseCart(data))}
                           className="ml-2 mr-2 text-sm"
                        >
                           <i className="fa-solid fa-minus H1"></i>
                        </button>
                        <p className="rounde-lg H1 w-[120px] rounded-xl bg-white text-center text-sm font-bold">
                           {cart?.cartItems?.find(
                              (cartItem) => cartItem?._id === data?._id
                           )?.cartQuantity
                              ? cart?.cartItems?.find(
                                   (cartItem) => cartItem?._id === data?._id
                                )?.cartQuantity
                              : 0}
                        </p>
                        <button
                           onClick={() => dispatch(incrementCart(data))}
                           className="ml-2 text-sm"
                        >
                           <i className="fa-solid fa-plus H1"></i>
                        </button>
                     </div>
                  </div>
                  <button
                     onClick={() => handleCart(data)}
                     className="mt-5 flex rounded border-0 bg-custom-hot px-6 py-2 text-white focus:outline-none"
                  >
                     Add to cart
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}

export default Product
