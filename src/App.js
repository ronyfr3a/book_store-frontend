import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// container
import Layout from "./Layout";

// pages
const Home = React.lazy( () =>
   import( "./pages/Home" )
)

const Awarded = React.lazy( () =>
   import( "./pages/Awarded" )
)

const Product = React.lazy( () =>
   import( "./pages/Product" )
)
const CartScreen = React.lazy( () =>
   import( "./pages/cart/CartScreen" )
)


const App = () => {

   return (
      <Layout>
         <Suspense fallback={ <p>Loading...</p> }>
            <Routes>
               <Route path="/" element={ <Home /> } />
               <Route path="/awarded-books" element={ <Awarded /> } />
               <Route path="/product/:id" element={ <Product /> } />
               <Route path="/cart" element={ <CartScreen /> } />
               <Route path="/*" element={ <p>Page not found!</p> } />
            </Routes>
         </Suspense>
      </Layout>
   )
}

export default App
