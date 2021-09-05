import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import imagesAPI from './services/imageApi';
import Modal from './components/Modal/Modal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoaderSpin from './components/Loader/Loader';
import Button from './components/Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

class App extends Component {
  state = {
    searchInput: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    modalImage: '',
    alt: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevInput = prevState.searchInput;
    const nextInput = this.state.searchInput;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevInput !== nextInput || prevPage !== nextPage) {
      this.setState({ isLoading: true });
      imagesAPI
        .fetchImagesAPI(nextInput, nextPage)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return this.setState({
              status: 'rejected',
              error: `не удалось найти изображение по запросу ${nextInput}`,
            });
          }
          this.setState(({ images, page }) => ({
            images: [...images, ...hits],
            page: page,
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  onSearch = searchInput => {
    this.setState({ searchInput, images: [], page: 1, error: null });
  };
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.scrolling();
  };
  scrolling = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  openModal = event => {
    this.setState(() => ({
      modalImage: event.target.dataset.largeimg,
      alt: event.target.alt,
    }));
    this.toggleModal();
  };
  closeModal = () => {
    this.setState({
      modalImage: '',
    });
    this.toggleModal();
  };

  render() {
    const { images, error, modalImage, showModal, isLoading, alt } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSearch} />
        {isLoading && <LoaderSpin />}
        {images.length > 0 && !error && (
          <>
            <ImageGallery onClick={this.openModal} images={images} />
            <Button loadImages={this.onLoadMore} />
          </>
        )}
        {showModal && (
          <Modal onClose={this.closeModal} src={modalImage} alt={alt} />
        )}
        {error && <p className={s.error}>{error}</p>}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
