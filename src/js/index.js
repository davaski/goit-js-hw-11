import { getPhotos } from './api';
import { createMarkap } from './markap';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const search = document.querySelector('.js-search-form');
const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a');
let page = 1;
let q = '';

let observer = new IntersectionObserver(loadPlus, {
  root: null,
  rootMargin: '150px',
  threshold: 1.0,
});

function loadPlus(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      page += 1;

      try {
        const data = await getPhotos(q, page);
        const markap = createMarkap(data.hits);
        gallery.insertAdjacentHTML('beforeend', markap);
        lightbox.refresh();
        checkPhotos(data.totalHits);
      } catch (error) {
        Notify.failure('Sorry, something went wrong. Please try again.');
        console.log(error.message);
      }
    }
  });
}

search.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  q = event.target.searchQuery.value;

  try {
    const data = await getPhotos(q, page);
    if (!data.hits.length)
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

    Notify.success(`Hurray! We found ${data.totalHits} images.`);
    const markap = createMarkap(data.hits);
    gallery.insertAdjacentHTML('beforeend', markap);
    lightbox.refresh();
    checkPhotos(data.totalHits);
  } catch (error) {
    Notify.failure('Sorry, something went wrong. Please try again.');
    console.log(error.message);
  }
}

function checkPhotos(total) {
  if (page < Math.ceil(total / 40)) {
    const lastChild = document.querySelector('.photo-card:last-child');
    observer.observe(lastChild);
  } else {
    Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
  }
}
