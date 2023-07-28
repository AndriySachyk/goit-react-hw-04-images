import { useEffect, useState } from 'react'
import { Searchbar } from'./Searchbar/Searchbar.jsx'
import GalleryImages from '../api/image.js';

import {Modal}  from './Modal/Modal.jsx';
import Notiflix from 'notiflix';
import { Container } from 'App-style.js';
import { Loader } from './Loader/Loader.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';


const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  
}

const galleryImages = new GalleryImages();







export const App = ()=> {
  


const [images, setImages] = useState([]);
const [searchQuery, setSearchQuery] = useState(null);
const [status, setStatus] = useState(STATUS.IDLE);
const [error, setError] = useState('');
const [modal, setModal] = useState(false);
const [modalImage, setModalImage] = useState('');

// *==================handleSubmit====================
const handleSubmit = (e) => {
  e.preventDefault()
  galleryImages.resetPage()

  const value = e.target[1].value.trim();
  if (searchQuery === value) {
    Notiflix.Notify.warning('The request for this value has already been processed, please enter another value');
   
    return
  }
  setSearchQuery(value)

}
// *==================/handleSubmit====================

useEffect(() => {
  // console.log(searchQuery)
  if (searchQuery || searchQuery === '') createImages();
  // eslint-disable-next-line
},[searchQuery])



// *==================createImages====================
const createImages = async () => {
  setStatus(STATUS.PENDING)
   if (searchQuery === '' ) {
    console.log('hella')
    Notiflix.Notify.warning('Please fill in this field');
           
    setImages([])
    setStatus(STATUS.IDLE)
    return
  }
      try {
          const data = await galleryImages.getGallery(searchQuery)
          // console.log(data)
          if (data.hits.length === 0) {
            setImages([]);
            setStatus(STATUS.REJECTED)
            
            return Notiflix.Notify.failure(`Sorry, image ${searchQuery} not found`);
          } 
        
            setImages([...data.hits]);
        setStatus(STATUS.FULFILLED);
        
        Notiflix.Notify.success(`Total: ${data.totalHits}`);
        const totalHits = Math.round(data.totalHits / galleryImages.perPage);
        const thisPage = galleryImages.page;
        
        if (thisPage > totalHits) {
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          setStatus(STATUS.IDLE)
          return 
        }
      } catch (error) {
        setStatus(STATUS.REJECTED)
        setError(error.message)
        Notiflix.Notify.failure(error.message);
      }
  }
  

// *==================/createImages====================


// *==================handleClick====================
  
const handleClick  = async() => {
  setStatus(STATUS.PENDING)
  try {
    const result = await galleryImages.getGallery(searchQuery);
    const totalHits = Math.round(result.totalHits / galleryImages.perPage);
    const thisPage = galleryImages.page;
    
    
    setImages([...images, ...result.hits])
    if (thisPage > totalHits) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
        );
        
        setStatus(STATUS.IDLE)
        return
      }
    setStatus(STATUS.FULFILLED)
  } catch (error) {
    setStatus(STATUS.REJECTED)
    setError(error.message) 
    Notiflix.Notify.failure(error.message);
  }
  
}
// *==================/handleClick====================
  
  
// *==================clickGalleryItem====================
const clickGalleryItem=(even)=> {
  even.preventDefault();
  
  if (even.target.nodeName === 'IMG') {
    setModal(true)
    setModalImage(even.target.currentSrc)
  };
}
// *==================/clickGalleryItem====================

// *==================consoleModal====================
const consoleModal = (even) => {
  setModal(false)
}
// *==================/consoleModal====================

  
return(
  <>
        <Searchbar handleSubmit={handleSubmit}  />
        <Container>
          <ImageGallery onClick={clickGalleryItem} images={images} />
          {status === STATUS.FULFILLED && <Button handleClick={handleClick} />}
          {status === STATUS.PENDING && <Loader />}
          {status === STATUS.REJECTED && <h2>{error}</h2>}

          {modal && <Modal consoleModal={consoleModal} image={modalImage} />}

        </Container>
      </>
        );
        
      }
  
    
    

      
    // handleSubmit = (e) => {
    //   e.preventDefault()
    //   galleryImages.resetPage()
    //   if (this.state.searchQuery === e.target[1].value.trim()) {
    //     Notiflix.Notify.warning('The request for this value has already been processed, please enter another value');
    //     return
    //   }
  
    //   this.setState({
    //     searchQuery: e.target[1].value.trim(),
    //   })
  
      
    
    // }
  
    
    // createImages = async () => {
    //   this.setState({
    //     status: STATUS.PENDING
    //   })
      
    //   try {
  
  
    //     if (!this.state.searchQuery) {
    //       Notiflix.Notify.warning('Please fill in this field');
         
    //       this.setState({
    //         images: []
    //       })
    //       return
    //     }
  
    //     const data = await galleryImages.getGallery(this.state.searchQuery)
    //     // console.log(data)
    //     if (data.hits.length === 0) {
    //       this.setState({
    //         images: [],
    //         status: STATUS.REJECTED
    //       })
  
    //       return Notiflix.Notify.failure(`Sorry, image ${this.state.searchQuery} not found`);
    //     } 
    //     this.setState({
    //       images: [...data.hits],
    //       status: STATUS.FULFILLED,
          
    //     })
    //     Notiflix.Notify.success(`Total: ${data.totalHits}`);
    //     const totalHits = Math.round(data.totalHits / galleryImages.perPage);
    //     const thisPage = galleryImages.page;
    //     if (thisPage > totalHits) {
    //       Notiflix.Notify.failure(
    //         "We're sorry, but you've reached the end of search results."
    //       );
    //       this.setState({ status: STATUS.IDLE })
    //       return
    //     }
    //   } catch (error) {
    //     this.setState({
    //       error: error.message,
    //       status: STATUS.REJECTED,
    //     })
    //     Notiflix.Notify.failure(error.message);
    //   }
    // }
    
  
    
    // handleClick  = async() => {
    //   this.setState({
    //     status: STATUS.PENDING
    //   })
    //   try {
  
    //     const result = await galleryImages.getGallery(this.state.searchQuery);
    //     const totalHits = Math.round(result.totalHits / galleryImages.perPage);
    //     const thisPage = galleryImages.page;
  
  
        
  
       
    //     // console.log(result)
              
    //     this.setState(function (state) {
    //       return {
    //         images: [...state.images, ...result.hits]
    //       }
    //     });
    //     if (thisPage > totalHits) {
    //       Notiflix.Notify.failure(
    //         "We're sorry, but you've reached the end of search results."
    //         );
    //         this.setState({status:STATUS.IDLE})
    //         return
    //       }
    //       this.setState({
    //         status: STATUS.FULFILLED
    //       })
    //   } catch (error) {
    //     this.setState({
    //       error: error.message,
    //       status: STATUS.REJECTED,
    //     })
    //     Notiflix.Notify.failure(error.message);
    //   }
    
    // }
    // componentDidUpdate(prevProps, prevState) {
    //   if (prevState.searchQuery !== this.state.searchQuery)  this.createImages()
      
    // }
  
   
  
    // clickGalleryItem=(even)=> {
    //   even.preventDefault();
  
      
  
  
    //   if (even.target.nodeName === 'IMG') {
  
        
    //     this.setState({
    //       modal: true,
    //       modalImage: even.target.currentSrc
    //     })
  
    //   };
      
      
  
      
  
  
    // }
  
  
    // consoleModal = (even) => {
      
    //   this.setState({
    //     modal: false
    //   })
    // }