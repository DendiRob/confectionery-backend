import Product from "../models/product.js";

class AdminService {
    async updateProduct(productID: string, newProductData: object){
        const product = Product.findOne({productID})
        await Product.updateOne({productID: productID}, {$set: newProductData})
        return product
    }
}
export default new AdminService()