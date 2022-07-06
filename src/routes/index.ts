import express from "express";
import usersRoute from "./api/users_route";
import productsRoute from "./api/products_route";
import ordersRoute from "./api/orders_route";
const routes = express.Router();

routes.use("/orders", ordersRoute);
routes.use("/users", usersRoute);
routes.use("/products", productsRoute);

export default routes;
