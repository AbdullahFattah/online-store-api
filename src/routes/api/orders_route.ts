import express from "express";
import * as handlers from "../../handlers/orders_handler";
import authenticationMiddleware from "../../middlewares/authentication";
const routes = express.Router();

routes.post("/", handlers.createOrder);
routes.get("/", authenticationMiddleware, handlers.ordersIndex);
routes.get("/:id", authenticationMiddleware, handlers.getOrder);
routes.post("/:id/products", authenticationMiddleware, handlers.addProduct);
routes.patch("/", handlers.closeOrder);
export default routes;
