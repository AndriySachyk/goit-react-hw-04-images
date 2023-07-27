import axios from "axios";
const API_KEY = "36732320-36b39292b107cb29c68f7e6f5"

axios.defaults.baseURL = "https://pixabay.com/api/"


export default class GalleryImages {
  constructor() {
    this.page = 1;
    this.perPage = 12
  }

  async getGallery(qvery) {
    const {data} = await axios.get(
      `?key=${API_KEY}&q=${qvery}&page=${this.page}&image_type=photo&orientation=horizontal&per_page=${this.perPage}`
    );
    this.incrementPage(); 
    // console.log(gallery.data);
    return data;
  }


  resetPage() {
   return this.page = 1;
  }

  incrementPage() {
   return  this.page += 1;
  }
}