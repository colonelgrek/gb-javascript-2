'use strict';

class ProductsList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
  }

  _fetchProducts() {
    this.goods = [
      { id: 1, title: 'Notebook', price: 2000 },
      { id: 2, title: 'Mouse', price: 20 },
      { id: 3, title: 'Keyboard', price: 200 },
      { id: 4, title: 'Gamepad', price: 50 },
    ];
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new ProductItem(product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render())
    }
  }

  sum() {
    let sum = 0;
    this.goods.forEach(item => sum += item.price);
    console.log(sum);
    return sum;
  }
}


class ProductItem {
  constructor(product, img = 'img/camera.jpg') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="products__item" data-id="${this.id}">
              <img class="products__item-image" src=${this.img} alt="${this.title}" width="360" height="420">
              <h3 class="products__item-heading">${this.title}</h3>
              <p class="products__item-price">${this.price}$</p>
              <button class="buy-btn">Купить</button>
            </div>`
  }
}

class Basket {
  add() {
  }

  remove() {
  }

  clear() {
  }
}

class ElemBasket {
  seeMore() {
  }
}

let list = new ProductsList();
list.render();
list.sum();


/* lesson1 */
// const products = [
//   { id: 1, title: 'Notebook', price: 2000 },
//   { id: 2, title: 'Mouse', price: 20 },
//   { id: 3, title: 'Keyboard', price: 200 },
//   { id: 4, title: 'Gamepad', price: 50 },
// ];

// //Функция для формирования верстки каждого товара
// const renderProduct = (item, imgSrc = 'img/camera.jpg') => {
//   return `<div class="products__item">
          //     <img class="products__item-image" src=${imgSrc} alt="${item.title}" width="360" height="420">
          //     <h3 class="products__item-heading">${item.title}</h3>
          //     <p class="products__item-price">${item.price}$</p>
          //     <button class="buy-btn">Купить</button>
          // </div>`
// };

// const renderPage = list => {
//   const productsList = list.map(item => renderProduct(item)).join('');
//   document.querySelector('.products').innerHTML = productsList;
// };

// renderPage(products);