import ApiError from "../exceptions/api-error.js";
import Product from "../models/product.js";
import Vacancy from "../models/vacancy.js";

class AdminService {
    async updateProduct(productID: string, newProductData: object){

        const product = await Product.findOne({productID});
        if(!product){
            throw ApiError.ItemNotExits('Продукт не найден', [])
        }
        await Product.updateOne({productID: productID}, {$set: newProductData})
        
        return product
    }

    async updateVacancy(_id: string, newVacancyData: object){

        const vacancy = await Vacancy.findById({_id});
        if(!vacancy){
            throw ApiError.ItemNotExits('Вакансия не найдена', [])
        }
        await Vacancy.updateOne({_id: _id}, {$set: newVacancyData})
        
        return vacancy
    }

    async addVacancy(newVacancy: object) {
        console.log(newVacancy)
        const addNewVacancy = await Vacancy.create(newVacancy);
        //добавить обработчик ошибок
        return addNewVacancy
    }
}
export default new AdminService()