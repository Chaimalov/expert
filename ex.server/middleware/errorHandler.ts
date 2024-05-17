export const errorHandler = (error, req, res, next) => {
  console.error(`error ${error.message}`);
  const status = error.status || 400;

  res.status(status).send(error.message);
};

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
