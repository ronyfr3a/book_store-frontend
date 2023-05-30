import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   cartItems: localStorage.getItem( 'cartItems' )
      ? JSON.parse( localStorage.getItem( 'cartItems' ) )
      : [],
   cartTotalQuantity: 0,
   cartTotalAmount: 0,
}

export const CartSlice = createSlice( {
   name: 'cart',
   initialState,
   reducers: {
      addToCart( state, action ) {
         const product = state.cartItems.findIndex(
            ( item ) => item._id === action.payload._id
         )
         if ( product >= 0 ) {
            state.cartItems[product].cartQuantity += 1
         } else {
            const tempProduct = { ...action.payload, cartQuantity: 1 }
            state.cartItems.push( tempProduct )
         }

         localStorage.setItem( 'cartItems', JSON.stringify( state.cartItems ) )
      },

      removeFromCart( state, action ) {
         state?.cartItems?.map( ( cartItem ) => {
            if ( cartItem?._id === action?.payload?._id ) {
               let message = window.confirm(
                  'Do you want to remove it from cart?'
               )
               if ( message === true ) {
                  const nextCartItems = state?.cartItems?.filter(
                     ( item ) => item?._id !== cartItem?._id
                  )
                  state.cartItems = nextCartItems
               }
               console.log( 'Product stay in the cart' )
            }
            localStorage.setItem( 'cartItems', JSON.stringify( state.cartItems ) )
            return state
         } )
      },
      decreaseCart( state, action ) {
         const itemIndex = state.cartItems.findIndex(
            ( item ) => item?._id === action.payload?._id
         )
         if ( state.cartItems[itemIndex].cartQuantity > 1 ) {
            state.cartItems[itemIndex].cartQuantity -= 1
         } else if ( state.cartItems[itemIndex].cartQuantity === 1 ) {
            let message = window.confirm( 'Do you want to remove it from cart?' )
            if ( message === true ) {
               const nextCartItems = state.cartItems.filter(
                  ( item ) => item._id !== action.payload._id
               )
               state.cartItems = nextCartItems
            }
            console.log( 'product stay in the cart' )
         }
         localStorage.setItem( 'cartItems', JSON.stringify( state.cartItems ) )
      },
      incrementCart( state, action ) {
         const product = state.cartItems.findIndex(
            ( item ) => item._id === action.payload._id
         )
         if ( product >= 0 ) {
            state.cartItems[product].cartQuantity += 1
         } else {
            const tempProduct = { ...action.payload, cartQuantity: 1 }
            state.cartItems.push( tempProduct )
         }

         localStorage.setItem( 'cartItems', JSON.stringify( state.cartItems ) )
      },
      addByIncrement( state, action ) {
         const product = state.cartItems.findIndex(
            ( item ) => item._id === action.payload.product._id
         )
         if ( product >= 0 ) {
            state.cartItems[product].cartQuantity += action.payload.cartQuantity
         } else {
            const cartQuantity =
               action.payload.cartQuantity === 1
                  ? 1
                  : action.payload.cartQuantity
            const tempProduct = { ...action.payload.product, cartQuantity }
            state.cartItems.push( tempProduct )
         }

         localStorage.setItem( 'cartItems', JSON.stringify( state.cartItems ) )
      },
      getTotals( state, action ) {
         let { total, quantity } = state.cartItems.reduce(
            ( cartTotal, cartItem ) => {
               const { price, cartQuantity } = cartItem
               const itemTotal = price * cartQuantity

               cartTotal.total += itemTotal
               cartTotal.quantity += cartQuantity

               return cartTotal
            },
            {
               total: 0,
               quantity: 0,
            }
         )
         total = parseFloat( total.toFixed( 2 ) )
         state.cartTotalQuantity = quantity
         state.cartTotalAmount = total
      },
      clearCart( state, action ) {
         localStorage.removeItem( 'cartItems' )
      },
   },
} )

export const {
   addToCart,
   removeFromCart,
   decreaseCart,
   incrementCart,
   getTotals,
   addByIncrement,
   clearCart,
} = CartSlice.actions

export const cartReducer = CartSlice.reducer
