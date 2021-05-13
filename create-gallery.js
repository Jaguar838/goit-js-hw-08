// Задание
// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне.
//Превью результата посмотри по ссылке: https://take.ms/ZvBD0E.

// Разбей задание на несколько подзадач:

// 1. Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2. Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3. Открытие модального окна по клику на элементе галереи.

// Модальное окно с увеличенным изображением должно открываться исключительно при клике на само изображение
// (делайте проверку на то, куда пришелся клик пользователя,
// внутри функции, отвечающей за открытие модального окна);

// 4. Подмена значения атрибута src элемента img.lightbox__image.
// 5. Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6. Очистка значения атрибута src элемента img.lightbox__image. 
// Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе img,
//и указываться в href ссылки(это необходимо для доступности).

/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>  */

// Дополнительно
// 
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой
// по работе с событиями.
// 
// 7. Закрытие модального окна по клику на`div.lightbox__overlay`.
// 8. Закрытие модального окна по нажатию клавиши`ESC`.
// 
// Если вы реализуете дополнительный функционал в части закрытия модального окна по клику на оверлей,
// дополнительную функцию для этого создавать нет необходимости: при создании слушателя используйте ту же функцию,
// что используете для закрытия модального окна по кнопке.
// Аналогично для закрытия модального окна по нажатию на клавишу ESC: дублировать код не нужно,
// достаточно после проверки на то, что нажата была именно нужная клавиша, вызывать общую функцию по закрытию модалки;

// 9. Перелистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
// Если хотите выполнить задание в части реализации перелистывания изображений,
//   при создании разметки путем дополнения тега img атрибутом записывайте для каждого из изображений его индекс
//   (разумеется, листание можно реализовать и путем навигации по DOM, но это куда менее оптимальный вариант);
// Слушатели для закрытия модального окна и листания изображений создавайте только при открытии модального окна(то есть внутри ответственной за это функции).Соответственно, удаляйте при закрытии(внутри функции, отвечающей за закрытие модалки) – память браузера скажет вам за это спасибо

import galleryItems from './gallery-items.js';
const lastIndexGallery = galleryItems.length - 1;
// console.log(lastIndexGallery);

//Search DOM-node
const gallery = document.querySelector('.js-gallery'),

  lightbox = document.querySelector('.js-lightbox'),
  lightboxOverlay = document.querySelector('.lightbox__overlay'),
  lightboxImg = document.querySelector('.lightbox__image'),

  lightboxCloseBtn = document.querySelector('[data-action]');

//Create gallery makup
function galleryItemsMarkup(array) {
  
  const galleryItemsPalette = array
  .map(({ preview, original, description }, index) => {
  `<li class='gallery__item'>
  <a class='gallery__link' href='${original}'>
    <img
      class='gallery__image'
      src='${preview}'
      data-source='${original}'
      data-index='${index}'
      alt='${description}'
    /></a></li>`})
  .join('');
  console.log(galleryItemsPalette);
gallery.insertAdjacentHTML('beforeend', galleryItemsPalette);
};
galleryItemsMarkup(galleryItems);
// Реализация перелистывания галереи и закрытия с помощью ESC
const onKeyPressed = event => {
    if (event.key == 'Escape') CloseImg();
    if (event.key == 'ArrowRight') NextImg(1);
    if (event.key == 'ArrowLeft') NextImg(-1);
};

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
  if (nextIndex < 0) nextIndex = lastIndexGallery;
  if (nextIndex > lastIndexGallery) nextIndex = 0;

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



gallery.addEventListener('click', onGalleryClick);

