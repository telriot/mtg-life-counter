import { Request, Response } from "express";

export const asyncErrorHandler = (fn: any) => (
  req: Request,
  res: Response,
  next: () => any
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
