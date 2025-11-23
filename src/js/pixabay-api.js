import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/'

const API_KEY = '53362126-51b1829dff8ff927abd9caa0d'

export const getImagesByQuery = (query) => {
    return axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 40,
        },
    })
        .then(response => response.data)
}