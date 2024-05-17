import { Request,Response,NextFunction } from "express";
export const errorHandler = (error, req:Request, res:Response, next:NextFunction) => {
  console.error(`error ${error.message}`);
  const status = error.status || 400;

  res.status(status).send(error.message);
};

export class ApiError extends Error {
  status: number;
  constructor(message: string | undefined, status: number) {
    super(message);
    this.status = status;
  }
}
