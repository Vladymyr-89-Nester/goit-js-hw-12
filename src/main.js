import iziToast from "izitoast"
import { getImagesByQuery } from "./js/pixabay-api"
import { clearGallery, createGallery, hideLoader, showLoader } from "./js/render-functions"
import iconErr from './img/group.svg'

const refs = {
    searchForm: document.querySelector('.form')
}

const onSearchQuery = event => {
    event.preventDefault()

    const query = event.target.elements['search-text'].value.trim()


    if (query === '') {
        return iziToast.error({
            message: 'Please enter a search query!',
            position: "topRight",
            iconUrl: iconErr,
            timeout: 7000,
            messageColor: '#FFFFFF',
            backgroundColor: '#ef4040',
        })
    }

    clearGallery()

    showLoader()

    getImagesByQuery(query)
        .then(data => {

            const { hits } = data

            if (hits.length === 0) {
                return iziToast.error({
                    message: 'Sorry, there are no images matching\nyour search query. Please try again!',
                    position: "topRight",
                    iconUrl: iconErr,
                    timeout: 7000,
                    messageColor: '#FFFFFF',
                    backgroundColor: '#ef4040',
                })
            }

            createGallery(hits)

        })
        .catch(err => {
            console.log(err);

        })
        .finally(() => {
            hideLoader()
            event.target.reset()
        })
}

refs.searchForm.addEventListener('submit', onSearchQuery)
