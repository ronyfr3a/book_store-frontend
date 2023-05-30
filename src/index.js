import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./services/store"
import "rsuite/dist/rsuite.min.css"
import App from "./App"
import "./css/index.css"

const rootElement = document.getElementById( "root" )
const root = createRoot( rootElement )

root.render(
   <BrowserRouter>
      <Provider store={ store }>
         <App />
      </Provider>
   </BrowserRouter>
)
