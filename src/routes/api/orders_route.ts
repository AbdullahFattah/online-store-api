import express from "express";
import * as handlers from "../../handlers/orders_handler";
import authenticationMiddleware from "../../middlewares/authentication";
const routes = express.Router();

routes.post("/", authenticationMiddleware, handlers.createOrder);
routes.get("/", authenticationMiddleware, handlers.ordersIndex);
routes.get("/:id", authenticationMiddleware, handlers.getOrder);
routes.post("/:id/products", authenticationMiddleware, handlers.addProduct);
export default routes;
