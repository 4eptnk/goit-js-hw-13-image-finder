import imageCardTpl from './templates/imageCard.hbs';

import getRefs from './js/get-refs';
import PicsApiService from './js/apiService';

import * as basicLightbox from 'basiclightbox';
import * as PNotify from '@pnotify/core/dist/PNotify';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile';
import '@pnotify/core/dist/BrightTheme.css';
import { defaults } from '@pnotify/core';

PNotify.defaultModules.set(PNotifyMobile, {});
defaults.delay = 2000;

const refs = getRefs();

const picsApiService = new PicsApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  picsApiService.query = evt.currentTarget.elements.query.value;

  if (picsApiService.query === '') {
    return PNotify.error({
      text: 'Пожалуйста , введите что нибудь для поиска!',
    });
  }

  picsApiService.resetPage();
  picsApiService.fetchPictures().then(hits => {
    if (hits.length !== 0) {
      PNotify.success({
        text: 'Вот что мы нашли по вашему запросу!',
      });
    } else {
      PNotify.error({
        text: 'Пожалуйста, проверьте свой запрос!',
      });
    }

    clearGalleryContainer();
    appendPicturesMarkup(hits);
  });
}

function appendPicturesMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTpl(hits));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && picsApiService.query !== '') {
      picsApiService.fetchPictures().then(hits => {
        appendPicturesMarkup(hits);
      });
    }
  });
};
const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});
observer.observe(refs.infiniteScroll);

refs.galleryContainer.addEventListener('click', onImgClick);

function onImgClick(evt) {
  evt.preventDefault();

  const isGalleryImageEl = evt.target.classList.contains('image');
  if (!isGalleryImageEl) {
    return;
  }
  const largeImageURL = evt.target.alt;

  const instance = basicLightbox.create(`<img src="${largeImageURL}" width="100%">`);
  instance.show();
}

// var counter = 0;
// $('input').on('input', function (e) {
//   counter = $(this).val().length * 4;
//   $('.underline').css('width', counter + '%');

//   if ($(this).val().length == 0) $('.underline').css('width', '100%');
// });
