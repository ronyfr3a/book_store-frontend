import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import FooterHeader from "./components/footer/FooterHeader"

const Layout = ({ children }) => {
   return (
      <div>
         <Navbar />
         <div className="mx-auto max-w-7xl px-2.5 md:px-6">{children}</div>
         <FooterHeader />
         <Footer />
      </div>
   )
}

export default Layout
