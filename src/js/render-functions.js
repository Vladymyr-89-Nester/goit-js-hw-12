import SimpleLightbox from "simplelightbox"

const refsRender = {
    gallery: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
}

const modalLightBox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
})

export const createGallery = (images) => {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
        </a>
        <div class="info">
          <p><span class="description">Likes:</span> ${likes}</p>
          <p><span class="description">Views:</span> ${views}</p>
          <p><span class="description">Comments:</span> ${comments}</p>
          <p><span class="description">Downloads:</span> ${downloads}</p>
        </div>
      </li>
    `
    ).join('')

    refsRender.gallery.insertAdjacentHTML('beforeend', markup)

    modalLightBox.refresh()
}

export const clearGallery = () => {
    refsRender.gallery.innerHTML = ''
}

export const showLoader = () => {
    refsRender.loader.classList.add('visible')
}

export const hideLoader = () => {
    refsRender.loader.classList.remove('visible')
}