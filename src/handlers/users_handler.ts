import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user_model";
import jwt from "jsonwebtoken";
const store = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await store.create(req.body);
    res.json({
      Data: { ...user },
      Note: "User has been added successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await store.getUsers();
    res.json({
      Action: "View all users",
      data: { ...users },
      Note: "Request complete",
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await store.getUser(req.params.id as unknown as string);
    res.json({
      Action: "View a user",
      data: { ...user },
      Note: "Request complete",
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const update = await store.updateUser(req.body);
    res.json({
      Action: "Update user details",
      data: { ...update },
      Note: "Request complete",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userDelete = await store.deleteUser(
      req.params.id as unknown as string
    );
    res.json({
      Action: "Delete a user",
      Data: { ...userDelete },
      Note: "User has been deleted",
    });
  } catch (err) {
    next(err);
  }
};

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await store.authenticate(username, password);
    const token = jwt.sign(
      { user },
      process.env.TOKEN_SECRET as unknown as string
    );
    if (!user) {
      return res.status(401).json({
        Message:
          "Unable to log in, make sure the user exists and the credentials are correct.",
      });
    }
    return res.json({
      Action: "Login",
      Data: { ...user, token },
      Note: "Request complete",
    });
  } catch (err) {
    next(err);
  }
};
