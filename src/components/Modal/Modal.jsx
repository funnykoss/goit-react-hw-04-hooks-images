import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from "./Modal.module.css";

const modalRoot= document.querySelector('#modal-root')
export default class Modal extends Component {
    state = {
        loading: false,
    }
    componentDidMount() {
        
        window.addEventListener('keydown',this.handleKeyDown )
    }
    componentWillUnmount() {
       
        window.removeEventListener('keydown', this.handleKeyDown)
    }
    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose()
        }
    }
    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
           this.props.onClose()
        }
    }
   
    render() {
        const { src, alt } = this.props;
        return createPortal(
            <div className={s.overlay} onClick={this.handleBackdropClick}>
            <div className={s.modal}>
                    <img className={s.modalImg} src={src} alt={alt}></img> 
            </div>
        </div>,
            modalRoot,
        );
    }
}