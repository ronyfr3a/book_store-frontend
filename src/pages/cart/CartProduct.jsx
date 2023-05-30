import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Summary from "./Summary"
import { Modal, Button } from "rsuite"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { SnackbarProvider, enqueueSnackbar } from "notistack"
import {
   decreaseCart,
   getTotals,
   removeFromCart,
   incrementCart,
} from "../../services/cart"

const CartProduct = () => {
   const dispatch = useDispatch()
   const [checked, setChecked] = useState(false)
   const [confirm, setConfirm] = useState(false)

   const carts = useSelector((state) => state.cart)

   const confirmOrderForm = (e) => {
      e.preventDefault()
      if (
         !formik.isValid ||
         !formik.values.email ||
         !formik.values.phone ||
         !formik.values.first_name ||
         !formik.values.last_name ||
         !formik.values.address
      ) {
         enqueueSnackbar(`Please fill in the form details`, {
            variant: "warning",
            autoHideDuration: 1000,
            preventDuplicate: true,
         })
         setConfirm(false)
      } else {
         enqueueSnackbar(`Please see order confirmation on your email`, {
            variant: "success",
            autoHideDuration: 1000,
            preventDuplicate: true,
         })
         setConfirm(true)
      }
   }

   const formik = useFormik({
      initialValues: {
         email: "",
         address: "",
         phone: "",
         first_name: "",
         last_name: "",
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .required("Email field required")
            .matches(
               /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               "Invalid email format"
            ),
         address: Yup.string().required("Address field required"),
         phone: Yup.string().required("Phone field required"),
         first_name: Yup.string().required("First Name field required"),
         last_name: Yup.string().required("Last Name field required"),
      }),
      onSubmit: (values, { resetForm }) => {
         enqueueSnackbar(`Customer details saved succesfully`, {
            variant: "success",
            autoHideDuration: 1000,
            preventDuplicate: true,
         })
      },
   })

   useEffect(() => {
      dispatch(getTotals())
   }, [carts, dispatch])

   return (
      <div className="px-2.5 md:px-6">
         <SnackbarProvider
            preventDuplicate
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "right",
            }}
         />
         {confirm && (
            <Modal open={confirm} onClose={() => setConfirm(false)}>
               <Modal.Header>
                  <Modal.Title className="mb-2">
                     <p>Order #266352</p>
                     <p>Ordered Products:</p>
                  </Modal.Title>
               </Modal.Header>
               <div className="flex w-full flex-col rounded-md border mb-4">
                  {carts?.cartItems?.map((data, index) => (
                     <div
                        key={index}
                        className="hover group relative flex h-auto  w-full items-start justify-start border-b border-gray-100 bg-white px-4 py-3 transition-all last:border-b-0"
                     >
                        <div className="relative mr-3 flex flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-100 shadow-sm">
                           <img
                              src={data?.images?.[0]}
                              width="30"
                              height="30"
                              alt={data?.title}
                           />
                        </div>
                        <div className="flex w-full flex-col overflow-hidden">
                           <Link
                              className="line-clamp-1 truncate text-sm font-medium text-custom-orange no-underline"
                              to={`/product/${data?._id}`}
                           >
                              {data?.title}
                           </Link>
                           <span className="my-1 mb-1 text-xs text-custom-orange">
                              {data?.author?.name}
                           </span>
                           <div className="flex items-center justify-between">
                              <div className="product flex items-start font-bold">
                                 {data?.discount === 0 ? (
                                    <span className=" inline-block text-sm font-semibold sm:text-lg">
                                       Tk.{data?.price}
                                    </span>
                                 ) : (
                                    <div className="flex flex-col items-start justify-start">
                                       <span className="H1 text-base">
                                          TK.{" "}
                                          {Math.round(data?.discountedPrice)}
                                       </span>
                                       <div className="text-sm text-custom-hot line-through">
                                          TK. {data?.price}
                                       </div>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <Modal.Footer>
                  <button
                     onClick={() => setConfirm(false)}
                     className="px-4 py-1.5 bg-custom-orange rounded-md text-white mr-5"
                  >
                     Ok
                  </button>
                  <Button onClick={() => setConfirm(false)} appearance="subtle">
                     Cancel
                  </Button>
               </Modal.Footer>
            </Modal>
         )}
         <div className="jusitfy-center flex w-full flex-col items-stretch space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
            <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
               <div className="flex w-full flex-col items-start justify-start">
                  <div className="flex w-full flex-col rounded-md border">
                     {carts?.cartItems?.map((data, index) => (
                        <div
                           key={index}
                           className="hover group relative flex h-auto  w-full items-center justify-start border-b border-gray-100 bg-white px-4 py-3 transition-all last:border-b-0"
                        >
                           <div className="relative mr-4 flex flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-100 shadow-sm">
                              <img
                                 src={data?.images?.[0]}
                                 width="50"
                                 height="50"
                                 alt={data?.title}
                              />
                           </div>
                           <div className="flex w-full flex-col overflow-hidden">
                              <Link
                                 className="line-clamp-1 truncate text-base font-medium text-custom-orange no-underline"
                                 to={`/product/${data?._id}`}
                              >
                                 {data?.title}
                              </Link>
                              <span className="my-1 mb-1 text-xs text-custom-orange">
                                 {data?.author?.name}
                              </span>
                              <div className="flex items-center justify-between">
                                 <div className="product flex items-start font-bold">
                                    {data?.discount === 0 ? (
                                       <span className=" inline-block text-sm font-semibold sm:text-lg">
                                          Tk.{data?.price}
                                       </span>
                                    ) : (
                                       <div className="flex flex-col items-start justify-start">
                                          <span className="H1 text-base">
                                             TK.{" "}
                                             {Math.round(data?.discountedPrice)}
                                          </span>
                                          <div className="text-sm text-custom-hot line-through">
                                             TK. {data?.price}
                                          </div>
                                       </div>
                                    )}
                                 </div>
                                 <div className="w-22 RT flex h-8 flex-wrap items-center justify-evenly rounded-md border border-gray-100 bg-white p-1 md:w-24 lg:w-24">
                                    <button
                                       onClick={() =>
                                          dispatch(decreaseCart(data))
                                       }
                                    >
                                       <span className="text-dark text-base">
                                          <svg
                                             stroke="currentColor"
                                             fill="none"
                                             strokeWidth="2"
                                             viewBox="0 0 24 24"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             height="1em"
                                             width="1em"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <line
                                                x1="5"
                                                y1="12"
                                                x2="19"
                                                y2="12"
                                             ></line>
                                          </svg>
                                       </span>
                                    </button>
                                    <p className="text-dark px-1 text-sm font-semibold">
                                       {data?.cartQuantity}
                                    </p>
                                    <button
                                       onClick={() =>
                                          dispatch(incrementCart(data))
                                       }
                                    >
                                       <span className="text-dark text-base">
                                          <svg
                                             stroke="currentColor"
                                             fill="none"
                                             strokeWidth="2"
                                             viewBox="0 0 24 24"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             height="1em"
                                             width="1em"
                                             xmlns="http://www.w3.org/2000/svg"
                                          >
                                             <line
                                                x1="12"
                                                y1="5"
                                                x2="12"
                                                y2="19"
                                             ></line>
                                             <line
                                                x1="5"
                                                y1="12"
                                                x2="19"
                                                y2="12"
                                             ></line>
                                          </svg>
                                       </span>
                                    </button>
                                 </div>
                                 <button
                                    onClick={() =>
                                       dispatch(removeFromCart(data))
                                    }
                                    className="cursor-pointer text-lg text-red-400 hover:text-red-600"
                                 >
                                    <svg
                                       stroke="currentColor"
                                       fill="none"
                                       strokeWidth="2"
                                       viewBox="0 0 24 24"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       height="1em"
                                       width="1em"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <polyline points="3 6 5 6 21 6"></polyline>
                                       <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                       <line
                                          x1="10"
                                          y1="11"
                                          x2="10"
                                          y2="17"
                                       ></line>
                                       <line
                                          x1="14"
                                          y1="11"
                                          x2="14"
                                          y2="17"
                                       ></line>
                                    </svg>
                                 </button>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0 xl:space-x-8">
                  <Summary />
               </div>
            </div>
            <div className="flex w-full flex-col items-center md:items-start">
               <h3 className="mb-5 text-xl font-semibold leading-5 text-gray-800">
                  Customer Shipping Form
               </h3>
               <form className="w-full md:w-max">
                  <div className="group relative z-0 mb-5 w-full">
                     <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="floating_email"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
                        placeholder=" "
                     />
                     <label
                        htmlFor="floating_email"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600"
                     >
                        {formik.touched.email && formik.errors.email ? (
                           <small className="pt-1 text-sm text-custom-hot">
                              {formik.errors.email}
                           </small>
                        ) : (
                           "Email"
                        )}
                     </label>
                  </div>
                  <div className="group relative z-0 mb-6 w-full">
                     <input
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="floating_address"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
                        placeholder=" "
                     />
                     <label
                        htmlFor="Address"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600"
                     >
                        {formik.touched.address && formik.errors.address ? (
                           <small className="pt-1 text-sm text-custom-hot">
                              {formik.errors.address}
                           </small>
                        ) : (
                           "Address"
                        )}
                     </label>
                  </div>
                  <div className="group relative z-0 mb-6 w-full">
                     <input
                        type="number"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="floating_repeat_Phone Number"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
                        placeholder=" "
                     />
                     <label
                        htmlFor="floating_repeat_Phone Number"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600"
                     >
                        {formik.touched.phone && formik.errors.phone ? (
                           <small className="pt-1 text-sm text-custom-hot">
                              {formik.errors.phone}
                           </small>
                        ) : (
                           "Phone Number"
                        )}
                     </label>
                  </div>
                  <div className="grid md:grid-cols-2 md:gap-6">
                     <div className="group relative z-0 mb-6 w-full">
                        <input
                           type="text"
                           name="first_name"
                           value={formik.values.first_name}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           id="floating_first_name"
                           className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
                           placeholder=" "
                        />
                        <label
                           htmlFor="floating_first_name"
                           className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600"
                        >
                           {formik.touched.first_name &&
                           formik.errors.first_name ? (
                              <small className="pt-1 text-sm text-custom-hot">
                                 {formik.errors.first_name}
                              </small>
                           ) : (
                              "First Name"
                           )}
                        </label>
                     </div>
                     <div className="group relative z-0 mb-6 w-full">
                        <input
                           type="text"
                           name="last_name"
                           value={formik.values.last_name}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           id="floating_last_name"
                           className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-orange-500"
                           placeholder=" "
                        />
                        <label
                           htmlFor="floating_last_name"
                           className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600"
                        >
                           {formik.touched.last_name &&
                           formik.errors.last_name ? (
                              <small className="pt-1 text-sm text-custom-hot">
                                 {formik.errors.last_name}
                              </small>
                           ) : (
                              "Last Name"
                           )}
                        </label>
                     </div>
                  </div>
                  <button
                     onClick={formik.handleSubmit}
                     className="mb-5 w-full rounded-lg bg-custom-orange px-5 py-2.5 text-center text-sm font-medium text-white"
                  >
                     Save Details
                  </button>
               </form>
               <div>
                  <input
                     className="border-custom-lightgray-gray-300 mr-0.5 h-3.5 w-3.5 rounded text-orange-600 default:ring-2 focus:ring-orange-500"
                     type="checkbox"
                     name="check"
                     value={checked}
                     onChange={(e) => setChecked(!checked)}
                     checked={checked}
                  />{" "}
                  <span className="text-xs">
                     I agree to the Terms & condition, Privacy policy Refund
                     policy
                  </span>
               </div>
               <button
                  disabled={!checked}
                  type="submit"
                  className={`${
                     !checked
                        ? "mt-3 cursor-not-allowed rounded-md bg-custom-dark px-4 py-1.5 text-center text-white"
                        : "mt-3 rounded-md bg-custom-orange px-4 py-1.5 text-center text-white"
                  }`}
                  onClick={confirmOrderForm}
               >
                  Confirm order
               </button>
            </div>
         </div>
      </div>
   )
}

export default CartProduct
