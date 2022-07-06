import express from "express";
import * as handlers from "../../handlers/products_handler";
import authenticationMiddleware from "../../middlewares/authentication";
const routes = express.Router();

routes.post("/", authenticationMiddleware, handlers.create);
routes.get("/", handlers.index);
routes.get("/:id", handlers.showProduct);
routes.delete("/:id", handlers.deleteProduct);
// routes.get("/:id", authenticationMiddleware, handlers.getUser);
// routes.patch("/:id", authenticationMiddleware, handlers.updateUser);
// routes.delete("/:id", authenticationMiddleware, handlers.deleteUser);
// routes.post("/authenticate", handlers.authenticate);

export default routes;
