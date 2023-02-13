import { NextFunction, Request, Response } from 'express';
import Products from '../models/products';
import Files from '../models/files';
import ApiError from '../error/ApiError';

class ProductController {
  create(req: Request, res: Response, next: NextFunction) {
    const { title, description, price, imgId } = req.body;
    if (!title) return next(ApiError.badRequest('field title is required'));
    if (!description) return next(ApiError.badRequest('field description is required'));
    if (!price) return next(ApiError.badRequest('field price is required'));
    if (!imgId) return next(ApiError.badRequest('field imgId is required'));

    try {
      Products.create({
        title,
        description,
        price,
        imgId
      }).catch((e) => console.log(e));
      res.sendStatus(200);
    } catch (error: unknown) {
      return next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(ApiError.badRequest('field id is required'));
    const { title, description, price, imgId } = req.body;
    if (!title) return next(ApiError.badRequest('field title is required'));
    if (!description) return next(ApiError.badRequest('field description is required'));
    if (!price) return next(ApiError.badRequest('field price is required'));
    if (!imgId) return next(ApiError.badRequest('field imgId is required'));

    try {
      await Products.update(
        {
          title,
          description,
          price,
          imgId
        },
        {
          where: {
            id
          }
        }
      );
      res.sendStatus(200);
    } catch (error: unknown) {
      return next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      let limit = +(req.query.limit as string) || 10;
      if (isNaN(limit)) limit = 10;
      const page = (req.query.page as string) || 1;
      const offset = +page * +limit - +limit;

      const products = await Products.findAll({
        limit,
        offset,
        attributes: { exclude: ['imgId'] },
        include: [
          {
            model: Files,
            as: 'image'
          }
        ]
      });
      return res.send(products);
    } catch (error: unknown) {
      return next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return next(ApiError.badRequest('field id is required'));

      const product = await Products.findOne({
        where: { id },
        include: [
          {
            model: Files,
            as: 'image'
          }
        ]
      });
      return res.send(product);
    } catch (error: unknown) {
      return next(error);
    }
  }

  async removeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return next(ApiError.badRequest('field id is required'));

      await Products.destroy({
        where: { id }
      });
      return res.sendStatus(200);
    } catch (error: unknown) {
      return next(error);
    }
  }
}

export default new ProductController();
