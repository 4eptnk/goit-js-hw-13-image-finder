export default function getRefs() {
  return {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    imageCard: document.querySelector('.image-item'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    infiniteScroll: document.querySelector('#infifnite-scroll-container'),
  };
}
