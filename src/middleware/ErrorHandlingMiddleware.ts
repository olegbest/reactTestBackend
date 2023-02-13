import { Request, Response } from 'express';
import { Error } from 'sequelize';

import ApiError from '../error/ApiError';

export default function ErrorHandlingMiddleware(err: unknown, req: Request, res: Response) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).json({ message: 'DB error' });
  }
  return res.status(500).json({ message: 'unknown error' });
}
