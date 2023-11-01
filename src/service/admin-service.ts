import ApiError from "../exceptions/api-error.js";
import Product from "../models/product.js";

class AdminService {
    async updateProduct(productID: string, newProductData: object){

        const product = await Product.findOne({productID});
        if(!product){
            throw ApiError.ProductNotExits('Продукт не найден', [])
        }
        await Product.updateOne({productID: productID}, {$set: newProductData})
        
        return product
    }
}
export default new AdminService()