import express from "express";
import * as handlers from "../../handlers/orders_handler";
import authenticationMiddleware from "../../middlewares/authentication";
const routes = express.Router();

routes.post("/", handlers.createOrder);
routes.get("/", handlers.ordersIndex);
routes.get("/:id", handlers.getOrder);
routes.post("/:id/products", handlers.addProduct);
export default routes;
