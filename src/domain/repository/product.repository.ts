import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import Product from "../entity/product";
import ProductRepositoryInterface from "./product-repository-interface";

export default class ProductRepository implements ProductRepositoryInterface  {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
    }
    async update(entity: Product): Promise<void>{
        await ProductModel.update(
        {
            name: entity.name,
            price: entity.price,
        },
        {
            where: {
                id: entity.id
            }
        })
    }
    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({
                where: {
                    id: id
                }
            });
        
        const product = new Product(
            productModel.id,
            productModel.name,
            productModel.price
        )
        return product;
    }
    async findAll(): Promise<Product[]> {
        const productsModel = await ProductModel.findAll()
        const products = productsModel.map((productModel) => {
            const product = new Product(
                productModel.id,
                productModel.name,
                productModel.price
            )
            return product;
        })
        return products;

    }
}