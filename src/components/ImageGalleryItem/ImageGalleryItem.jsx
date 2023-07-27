import { ImageGalleryItemLi, ImageGalleryItemImg } from "./ImageGalleryItem-style"
import PropTypes from 'prop-types';


export const ImageGalleryItem = ({ webformatURL, tags, id }) => {
    return (
        <>
            <ImageGalleryItemLi className="gallery-item" >
                <ImageGalleryItemImg src={webformatURL} alt={tags} id={id} />
            </ImageGalleryItemLi>
        </>
        
    )
}



ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,

}