import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"

import { awarded_booksApi } from "./awarded"
import { book_detailsApi } from "./book"
import { search_booksApi } from "./search"

import { drawerReducer } from "./cartDrawer"
import { cartReducer } from "./cart"


export const store = configureStore( {
   reducer: {
      drawer: drawerReducer,
      cart: cartReducer,
      [awarded_booksApi.reducerPath]: awarded_booksApi.reducer,
      [book_detailsApi.reducerPath]: book_detailsApi.reducer,
      [search_booksApi.reducerPath]: search_booksApi.reducer,
   },
   middleware: ( gDM ) =>
      gDM().concat( [
         awarded_booksApi.middleware,
         book_detailsApi.middleware,
         search_booksApi.middleware,
      ] ),
} )

setupListeners( store.dispatch )
