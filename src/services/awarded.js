import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const awarded_booksApi = createApi( {
    reducerPath: "awarded_books",
    baseQuery: fetchBaseQuery( {
        baseUrl: "https://free-book-ronyfr3-api.onrender.com/api",
        prepareHeaders: ( headers ) => {
            headers.set( 'Content-Type', 'application/json' )
            return headers
        }
    } ),
    tagTypes: ["awarded_books"],
    endpoints: ( builder ) => ( {
        getBooks: builder.query( {
            query: () => 'general/all',
            providesTags: ["awarded_books"],
        } ),
    } ),
} )

export const { useGetBooksQuery } = awarded_booksApi
