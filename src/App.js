/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import imagesAPI from './services/imageApi';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoaderSpin from './components/Loader/Loader';
import Button from './components/Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [alt, setAlt] = useState(null);
  useEffect(() => {
    if (searchInput === '') return;
    imagesAPI
      .fetchImagesAPI(searchInput, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return setError(
            `не удалось найти изображение по запросу ${searchInput}`,
          );
        }
        setImages([...images, ...hits]);
        setPage(page);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  }, [page, searchInput]);

  const onSearch = searchInput => {
    setSearchInput(searchInput);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };
  const onLoadMore = () => {
    setIsLoading(true);
    setPage(page => page + 1);
    console.log(page);
    scrolling();
  };
  const scrolling = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };
  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };
  const openModal = event => {
    setModalImage(() => event.target.dataset.largeimg);
    setAlt(() => event.target.alt);
    toggleModal();
  };
  const closeModal = () => {
    setModalImage('');
    toggleModal();
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSearch} />
      {isLoading && <LoaderSpin />}
      {images.length > 0 && !error && (
        <>
          <ImageGallery onClick={openModal} images={images} />
          <Button loadImages={onLoadMore} />
        </>
      )}
      {showModal && <Modal onClose={closeModal} src={modalImage} alt={alt} />}
      {error && <p className={s.error}>{error}</p>}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
