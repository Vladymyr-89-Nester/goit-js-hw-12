import iziToast from "izitoast"
import { getImagesByQuery } from "./js/pixabay-api"
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, refsRender, showLoader, showLoadMoreButton } from "./js/render-functions"
import iconErr from './img/group.svg'
import iconInfo from './img/group-1.svg'

const refs = {
    searchForm: document.querySelector('.form')
}

let page = 1
let currentQuery = ''
let totalHits = 0

const onSearchQuery = async event => {
    event.preventDefault()

    hideLoadMoreButton()

    refsRender.loadMoreBtn.removeEventListener('click', onLoadMore)

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

    page = 1
    currentQuery = query

    clearGallery()

    showLoader()

    try {
        const { hits, totalHits: newTotalHits } = await getImagesByQuery(currentQuery, page)

        totalHits = newTotalHits

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

        if (page * 15 < totalHits) {
            showLoadMoreButton()
            refsRender.loadMoreBtn.addEventListener('click', onLoadMore)
        }

    } catch (error) {
        console.log(error);

    } finally {
        hideLoader()
        event.target.reset()
    }

}

const onLoadMore = async event => {

    refsRender.loadMoreBtn.removeEventListener('click', onLoadMore)

    hideLoadMoreButton()

    page++

    showLoader()

    try {
        const { hits } = await getImagesByQuery(currentQuery, page)

        createGallery(hits)

        smoothScroll()

        if (page * 15 < totalHits) {
            showLoadMoreButton()

            refsRender.loadMoreBtn.addEventListener('click', onLoadMore)
        } else {
            iziToast.info({
                message: `We're sorry, but you've reached the end of search results.`,
                position: "topRight",
                iconUrl: iconInfo,
                timeout: 7000,
                messageColor: '#FFFFFF',
                backgroundColor: '#59a10d',
            })
        }

    } catch (error) {
        console.log(error);
    } finally {
        hideLoader()
    }
}

const smoothScroll = () => {
    const firstCard = refsRender.gallery.firstElementChild

    if (!firstCard) return

    const heightCard = firstCard.getBoundingClientRect().height

    scrollBy({
        top: heightCard * 2,
        behavior: 'smooth',
    })
}

refs.searchForm.addEventListener('submit', onSearchQuery)

