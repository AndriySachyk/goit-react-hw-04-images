import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { ImageGalleryUl } from "./ImageGallery-style"
import PropTypes from 'prop-types';


export const ImageGallery = ({onClick, images})=> {
    
       
        return(
            <>
                <ImageGalleryUl onClick={onClick} >
                    {images.map(image => <ImageGalleryItem key={image.id} id={image.id} webformatURL={image.webformatURL} tags={image.tags} />)}
                </ImageGalleryUl>
                
            </>
        )
    }


ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.number.isRequired })
    ),
}