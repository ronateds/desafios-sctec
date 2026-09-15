import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { CreateProductDto } from "../dtos/CreateProductDto";
import { validateDto } from "../middlewares/validate";
import { UpdateProductDto } from "../dtos/UpdateProductDto";

const productRoutes = Router();

const productController = new ProductController();

productRoutes.post(
    '/products',
    validateDto(CreateProductDto),
    (req, res) => productController.create(req, res)
)
productRoutes.get(
    '/products',
    (req, res) => productController.findAll(req, res)
)
productRoutes.get(
    '/products/search',
    (req, res) => productController.searchByName(req, res)
)
productRoutes.get(
    '/products/stock/available',
    (req, res) => productController.findAvaliable(req, res)
)
productRoutes.get(
    '/products/filter',
    (req, res) => productController.findByPriceRange(req, res)
)
productRoutes.get(
    '/products/stock/empty',
    (req, res) => productController.findOutOfStock(req, res)
)
productRoutes.get(
    '/products/:id',
    validateDto(UpdateProductDto),
    (req, res) => productController.findOne(req, res)
)
productRoutes.put(
    '/products/:id',
    (req, res) => productController.update(req, res)
)
productRoutes.delete(
    '/products/:id',
    (req, res) => productController.delete(req, res)
)

export default productRoutes;