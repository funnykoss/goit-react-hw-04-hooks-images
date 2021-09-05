import React from 'react';
import ImageGalleryItem from './ImageGalleryItem'
import s from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export default function ImageGallery({images, onClick}) {
    return (
        <ul className={s.ImageGallery}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => {
                return (
                    <ImageGalleryItem
                        key={id}
                        tags={tags}
                        src={webformatURL}
                        dataLargeImg={largeImageURL}
                        openModal={onClick}
                    />   
                )
            })}
        </ul>
    )
}

ImageGallery.prototype = {
    images: PropTypes.arrayOf(PropTypes.shape).isRequired,
    onClick: PropTypes.func,
}