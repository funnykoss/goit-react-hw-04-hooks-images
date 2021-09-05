const API_KEY = '6175642-0178aa6b85454b63af0eb865e'
// const BASE_URL = 'https://pixabay.com/api/'
function fetchImagesAPI(searchInput, page ) {
   
    return fetch(`https://pixabay.com/api/?q=${searchInput}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
                    if (response.ok) {
                       return response.json()
                    }
 return Promise.reject(new Error(`не удалось найти изображение по запросу ${searchInput}`))
         })
}

const api = {
    fetchImagesAPI,
}

export default api