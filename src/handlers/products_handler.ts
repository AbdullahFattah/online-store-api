import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product_model";
import jwt from "jsonwebtoken";

const store = new ProductModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await store.create(req.body);
    res.json({
      Data: { ...product },
      Note: "Product has been added successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const index = await store.index();
    res.json(index);
  } catch (err) {
    next(err);
  }
};

export const showProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await store.showProduct(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.send(
        `The product with id (${req.params.id}) doesn't exist, please make sure you have the correct id`
      );
    }
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await store.deleteProduct(req.params.id);
    if (product) {
      res.json({
        data: product,
        Note: `Product with id ${req.params.id} has been deleted.`,
      });
    } else {
      res.send(
        `Product with id (${req.params.id}) doesn't exist, please make sure you have the correct id`
      );
    }
  } catch (err) {
    next(err);
  }
};
