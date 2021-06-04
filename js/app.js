'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
            .then(data => {
              this.goods = [...data];
              this.render();
            });
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {console.log(error)})
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new ProductItem(product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render())
    }
  }

  calcSum() {
    return this.allProducts.reduce((accum, item) => accum += item.price, 0)
  }
}


class ProductItem {
  constructor(product, img = 'img/camera.jpg') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="products__item" data-id="${this.id_product}">
              <img class="products__item-image" src=${this.img} alt="${this.product_name}" width="360" height="420">
              <h3 class="products__item-heading">${this.product_name}</h3>
              <p class="products__item-price">${this.price}$</p>
              <button class="buy-btn">Купить</button>
            </div>`
  }
}

class Basket {
  constructor(container = '.basket') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._getProducts()
            .then(data => {
              this.goods = [...data.contents];
              this.render();
            });
  }

  _getProducts() {
    return fetch(`${API}/getBasket.json`)
      .then(result => result.json())
      .catch(error => {console.log(error)})
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObj = new ElemBasket(product);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.renderBasket())
    }
  }
  add() {
  }

  remove() {
  }

  clear() {
  }
}

class ElemBasket {
  constructor(product, img = 'img/camera.jpg') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }
  renderBasket() {
    return `<div class="products__item" data-id="${this.id_product}">
              <img class="products__item-image" src=${this.img} alt="${this.product_name}" width="360" height="420">
              <h3 class="products__item-heading">${this.product_name}</h3>
              <p class="products__item-price">${this.price}$</p>
              <button class="buy-btn">Купить</button>
            </div>`
  }
}

let list = new ProductsList();
let listBasket = new Basket();