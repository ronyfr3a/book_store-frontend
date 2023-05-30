import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

const LazyLoad = ({ imgUrl, imgAlt, className }) => {
   return (
      <LazyLoadImage
         alt={imgAlt}
         effect="blur"
         src={imgUrl}
         className={className}
      />
   )
}
export default LazyLoad
