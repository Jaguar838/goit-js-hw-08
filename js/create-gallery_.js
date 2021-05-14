const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const lastIndexGallery = galleryItems.length - 1;

//Search DOM-node
const gallery = document.querySelector('.js-gallery'),

  lightbox = document.querySelector('.js-lightbox'),
  lightboxOverlay = document.querySelector('.lightbox__overlay'),
  lightboxImg = document.querySelector('.lightbox__image'),

  lightboxCloseBtn = document.querySelector('[data-action]');

//Function markup gallery
function galleryItemsMarkup(galleryItems) {
  const galleryItemsPalette = galleryItems
    .map(({ preview, original, description }, index) =>
      `<li class='gallery__item'>
        <a class='gallery__link' href='${original}'>
        <img
          class='gallery__image'
          src='${preview}'
          data-source='${original}'
          data-index='${index}'
          alt='${description}'
        />
      </a></li>`)
    .join('');
  console.log(galleryItemsPalette);
  gallery.insertAdjacentHTML('beforeend', galleryItemsPalette);
};
console.log(galleryItemsMarkup(galleryItems));
galleryItemsMarkup(galleryItems);
console.log(galleryItemMarkup(galleryItems[0], 0));
// Create gallery
const galleryItemsPalette = galleryItems.map((galleryItem, index) => galleryItemMarkup(galleryItem, index)).join('');
console.log(galleryListMarkup);
gallery.insertAdjacentHTML('beforeend', galleryItemsPalette);

function OpenImg(photoIndex) {
  const currentPhoto = gallery.querySelector(
    `[data-index='${photoIndex}']`,
  );
  console.log(currentPhoto.dataset.source);
  lightbox.classList.add('is-open');
  lightbox.dataset.index = photoIndex
  lightboxImg.src = currentPhoto.dataset.source;
  lightboxImg.alt = currentPhoto.alt;

  window.addEventListener('keydown', onKeyPressed);
  lightboxCloseBtn.addEventListener('click', CloseImg);
  lightboxOverlay.addEventListener('click', CloseImg);
};

function NextImg(move) {
  let nextIndex = parseInt(lightbox.dataset.index) + move;
  //console.log(lightbox.dataset.index);
  if (nextIndex < 0) nextIndex = 0;
  if (nextIndex > lastIndexGallery) nextIndex = lastIndexGallery;

  lightbox.dataset.index = nextIndex;
  const nextPhoto = gallery.querySelector(`[data-index='${nextIndex}']`);
  lightboxImg.src = nextPhoto.dataset.source;
  lightboxImg.alt = nextPhoto.alt;
};

function CloseImg() {
  lightbox.classList.remove('is-open');
  lightbox.removeAttribute('data-index');

  lightboxImg.src = '';
  lightboxImg.alt = '';

  window.removeEventListener('keydown', onKeyPressed);
  lightboxCloseBtn.removeEventListener('click', CloseImg);
  lightboxOverlay.removeEventListener('click', CloseImg);
};

function onGalleryClick(event) {
  event.preventDefault();

  const targetPhoto = event.target;
  if (!targetPhoto.classList.contains('gallery__image')) return;

  OpenImg(targetPhoto.dataset.index);
};
// Реализация перелистывания галереи и закрытия с помощью ESC
const onKeyPressed = event => {
  // if (
  //   event.key !== 'Escape' &&
  //   event.key !== 'ArrowLeft' &&
  //   event.key !== 'ArrowRight'
  // ) {
  //   return;
  // }


  if (event.key == 'Escape') CloseImg();
  if (event.key == 'ArrowRight') NextImg(1);
  if (event.key == 'ArrowLeft') NextImg(-1);

};

gallery.addEventListener('click', onGalleryClick);