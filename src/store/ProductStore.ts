import { makeAutoObservable } from 'mobx';
import { basketStore } from './BasketStore';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

class ProductStore {
    products: Product[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadProducts();
    }

    loadProducts() {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            this.products = JSON.parse(savedProducts);
        }
    }

    saveProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    addProduct(product: Product) {
        this.products.push(product);
        this.saveProducts();
    }
    updateProduct(updatedProduct: Product) {
        const index = this.products.findIndex(
            (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...updatedProduct,
            };
        }
        this.saveProducts();
        basketStore.updateBasketProduct(updatedProduct);
    }
    deleteProduct(id: number) {
        this.products = this.products.filter((product) => product.id !== id);
        this.saveProducts();
    }

    clearProducts() {
        this.products = [];
        basketStore.clearBasket();
        localStorage.removeItem('products');
    }
}

export const productStore = new ProductStore();
