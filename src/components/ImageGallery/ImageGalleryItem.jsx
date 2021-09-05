import React from 'react';
import s from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export default function ImageGalleryItem({ tags, src, dataLargeImg, openModal }) {
    return (
        <li className={s.ImageGalleryItem} onClick={openModal}>
            <img
                src={src}
                alt={tags}
                data-largeimg={dataLargeImg}
                className={s.GalleryItemImage} />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    tags: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    dataLargeImg: PropTypes.string.isRequired,
    openModal: PropTypes.func,
}