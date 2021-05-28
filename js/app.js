'use strict';

const products = [
  { id: 1, title: 'Notebook', price: 2000 },
  { id: 2, title: 'Mouse', price: 20 },
  { id: 3, title: 'Keyboard', price: 200 },
  { id: 4, title: 'Gamepad', price: 50 },
];

//Функция для формирования верстки каждого товара
const renderProduct = (item, imgSrc = 'img/camera.jpg') => {
  return `<div class="products__item">
              <img class="products__item-image" src=${imgSrc} alt="${item.title}" width="360" height="420">
              <h3 class="products__item-heading">${item.title}</h3>
              <p class="products__item-price">${item.price}$</p>
              <button class="buy-btn">Купить</button>
          </div>`
};

const renderPage = list => {
  const productsList = list.map(item => renderProduct(item)).join('');
  document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);