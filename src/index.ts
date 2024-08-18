import { IProduct, IProductService } from "./interfaces";

class ProductList implements IProductService {
    private productList: IProduct[] = [];
    currentId: number = 1;

    createProduct(data: {name: string, price: number}): IProduct {
        const currentDate = new Date();
        const newProduct: IProduct = {
            id: this.currentId,
            name: data.name,
            price: data.price,
            createdAt: currentDate,
            updatedAt: currentDate,  
        };
    this.productList.push(newProduct)
    this.currentId++;
    return newProduct;   
    }

    getProducts(): IProduct[] {
        return this.productList;        
    }

    getOneProduct(id: number): IProduct | undefined {
        return this.productList.find(product => product.id === id)
    }

    updateProduct(id: number, data: { name?: string; price?: number; }): IProduct {
        const product = this.productList.find(product => product.id === id);
        if (!product) {
            throw new Error('Product not found');
          }
          if (data.name !== undefined) {
            product.name = data.name;
          }
          if (data.price !== undefined) {
            product.price = data.price;
          }
          product.upDateAt = new Date();
          return product;
    }

    deleteProduct(id: number): { message: string; } {
        const productIndex = this.productList.findIndex(product => product.id === id);
        this.productList.splice(productIndex, 1);
        return { message: "Product successfully deleted."}
    }    
}

const productList = new ProductList();

export { productList };
