import { makeAutoObservable } from 'mobx';
import { Product } from './ProductStore';

class BasketStore {
    basket: Product[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadBasket();
    }

    loadBasket() {
        const savedBasket = localStorage.getItem('basket');
        if (savedBasket) {
            this.basket = JSON.parse(savedBasket);
        }
    }

    saveBasket() {
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }
    addToBasket(product: Product) {
        if (!this.basket.find((p) => p.id === product.id)) {
            this.basket.push(product);
            this.saveBasket();
        }
    }

    removeFromBasket(id: number) {
        this.basket = this.basket.filter((product) => product.id !== id);
        this.saveBasket();
    }

    updateBasketProduct(updatedProduct: Product) {
        const index = this.basket.findIndex(
            (item) => item.id === updatedProduct.id
        );
        if (index !== -1) {
            this.basket[index] = {
                ...this.basket[index],
                ...updatedProduct,
            };
        }
        this.saveBasket();
    }

    clearBasket() {
        this.basket = [];
        localStorage.removeItem('basket');
    }
}

export const basketStore = new BasketStore();
