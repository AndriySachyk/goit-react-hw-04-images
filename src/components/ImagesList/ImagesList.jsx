import React from "react"
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { Button } from '../Button/Button';


export const ImagesList = ({ images, handleClick }) => {
    return (
        <>
            <ImageGallery images={images} />
            
        </>
    )
}