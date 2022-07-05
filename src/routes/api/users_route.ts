import express from "express";
import * as handlers from "../../handlers/users_handler";
const routes = express.Router();

routes.post("/", handlers.create);
routes.get("/", handlers.getUsers);
routes.get("/:id", handlers.getUser);
routes.patch("/:id", handlers.updateUser);
routes.delete("/:id", handlers.deleteUser);
routes.post("/authenticate", handlers.authenticate);

export default routes;
