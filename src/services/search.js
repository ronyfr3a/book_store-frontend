import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const search_booksApi = createApi( {
    reducerPath: "search_books",
    baseQuery: fetchBaseQuery( {
        baseUrl: "https://free-book-ronyfr3-api.onrender.com/api",
        prepareHeaders: ( headers ) => {
            headers.set( 'Content-Type', 'application/json' )
            return headers
        }
    } ),
    tagTypes: ["search_books"],
    endpoints: ( builder ) => ( {
        searchBooks: builder.query( {
            query: ( key ) => `search?keyword=${key}`,
            providesTags: ["search_books"],
        } ),
    } ),
} )

export const { useSearchBooksQuery } = search_booksApi
