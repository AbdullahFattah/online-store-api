import express from "express";
import usersRoute from "./api/users_route";
const routes = express.Router();

routes.use("/users", usersRoute);
export default routes;
