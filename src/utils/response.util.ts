import { Response } from "express";

interface Pagination {
  total_data: number;
  total_page: number;
  current_page: number;
  limit: number;
}

const response = {
  success: (
    res: Response,
    message: string,
    data: any,
    pagination?: Pagination
  ) => {
    if (pagination) {
      return res.json({
        code: 200,
        status: "success",
        data,
        message,
        pagination,
      });
    }

    return res.json({
      code: 200,
      status: "success",
      data,
      message,
    });
  },
  failed: (res: Response, error: string, code?: number) => {
    return res.status(code || 400).json({
      code: code || 400,
      status: "failed",
      error,
    });
  },
};

export default response;
