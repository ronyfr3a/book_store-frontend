import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const book_detailsApi = createApi( {
    reducerPath: "book_details",
    baseQuery: fetchBaseQuery( {
        baseUrl: "https://free-book-ronyfr3-api.onrender.com/api",
        prepareHeaders: ( headers ) => {
            headers.set( 'Content-Type', 'application/json' )
            return headers
        }
    } ),
    tagTypes: ["book_details"],
    endpoints: ( builder ) => ( {
        getBook: builder.query( {
            query: ( id ) => `search/one/${id}`,
            providesTags: ["book_details"],
        } ),
    } ),
} )

export const { useGetBookQuery } = book_detailsApi
