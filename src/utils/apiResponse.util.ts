import { Response } from "express";

export class ApiRes {
  static success<T>(
    res: Response,
    message: string,
    data: T | T[] = [],
    statusCode = 200,
  ) {
    const dataArray = Array.isArray(data) ? data : [data];
    return res.status(statusCode).json({
      status: 1,
      message,
      data: dataArray.length > 0 ? dataArray : [],
    });
  }

  static error(res: Response, message: string, statusCode = 400) {
    return res.status(statusCode).json({
      status: 0,
      message,
      data: [],
    });
  }
}
