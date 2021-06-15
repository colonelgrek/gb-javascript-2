'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    userSearch: '',
    showCart: false,
    catalogUrl: '/catalogData.json',
    cartUrl: '/getBasket.json',
    cartItems: [],
    filtered: [],
    imgCart: 'img/camera.jpg',
    products: [],
    imgProduct: 'img/camera.jpg',
    error: false
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
          error = true;
        })
    },
    addProduct(item) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
              find.quantity++;
            } else {
              const prod = Object.assign({ quantity: 1 }, item);
              this.cartItems.push(prod)
            }
          }
        })
    },
    remove(item) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
          }

        })
    },
    filter() {
      let regexp = new RegExp(this.userSearch, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    }
  },
  mounted() {
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let item of data.contents) {
          this.$data.cartItems.push(item);
        }
      });
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let item of data) {
          this.$data.products.push(item);
          this.$data.filtered.push(item);
        }
      });
    this.getJson(`getProducts.json`)
      .then(data => {
        for (let item of data) {
          this.products.push(item);
          this.filtered.push(item);
        }
      })
  }
})

// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// class ProductsList {
//   constructor(container = '.products') {
//     this.container = container;
//     this.goods = [];
//     this.allProducts = [];
//     this._getProducts()
//             .then(data => {
//               this.goods = [...data];
//               this.render();
//             });
//   }

//   _getProducts() {
//     return fetch(`${API}/catalogData.json`)
//       .then(result => result.json())
//       .catch(error => {console.log(error)})
//   }

//   render() {
//     const block = document.querySelector(this.container);
//     for (let product of this.goods) {
//       const productObj = new ProductItem(product);
//       this.allProducts.push(productObj);
//       block.insertAdjacentHTML('beforeend', productObj.render())
//     }
//   }

//   calcSum() {
//     return this.allProducts.reduce((accum, item) => accum += item.price, 0)
//   }
// }


// class ProductItem {
//   constructor(product, img = 'img/camera.jpg') {
//     this.product_name = product.product_name;
//     this.price = product.price;
//     this.id_product = product.id_product;
//     this.img = img;
//   }

//   render() {
//     return `<div class="products__item" data-id="${this.id_product}">
//               <img class="products__item-image" src=${this.img} alt="${this.product_name}" width="360" height="420">
//               <h3 class="products__item-heading">${this.product_name}</h3>
//               <p class="products__item-price">${this.price}$</p>
//               <button class="buy-btn">Купить</button>
//             </div>`
//   }
// }

// class Basket {
//   constructor(container = '.basket') {
//     this.container = container;
//     this.goods = [];
//     this.allProducts = [];
//     this._getProducts()
//             .then(data => {
//               this.goods = [...data.contents];
//               this.render();
//             });
//   }

//   _getProducts() {
//     return fetch(`${API}/getBasket.json`)
//       .then(result => result.json())
//       .catch(error => {console.log(error)})
//   }

//   render() {
//     const block = document.querySelector(this.container);
//     for (let product of this.goods) {
//       const productObj = new ElemBasket(product);
//       this.allProducts.push(productObj);
//       block.insertAdjacentHTML('beforeend', productObj.renderBasket())
//     }
//   }
//   add() {
//   }

//   remove() {
//   }

//   clear() {
//   }
// }

// class ElemBasket {
//   constructor(product, img = 'img/camera.jpg') {
//     this.product_name = product.product_name;
//     this.price = product.price;
//     this.id_product = product.id_product;
//     this.img = img;
//   }
//   renderBasket() {
//     return `<div class="products__item" data-id="${this.id_product}">
//               <img class="products__item-image" src=${this.img} alt="${this.product_name}" width="360" height="420">
//               <h3 class="products__item-heading">${this.product_name}</h3>
//               <p class="products__item-price">${this.price}$</p>
//               <button class="buy-btn">Купить</button>
//             </div>`
//   }
// }

// let list = new ProductsList();
// let listBasket = new Basket();