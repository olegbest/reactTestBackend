import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import Files from '../models/files';
import ApiError from '../error/ApiError';

class FilesController {
  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.files) {
      return next(ApiError.badRequest('field files is required'));
    }

    try {
      for (const filesKey in req.files) {
        if (!req.files[filesKey]) continue;

        const file = req.files[filesKey] as UploadedFile;
        const fileUuid = v4();
        const fileExtension = path.extname(file.name);
        const fullName = fileUuid + fileExtension;
        const host = req.protocol + '://' + req.get('host');
        const fileUrl = `${host}${process.env.STATIC_URL}/${fullName}`;

        await file.mv(path.resolve(__dirname, '..', 'static', fullName));
        const createdFile = await Files.create({
          uuid: fileUuid,
          name: file.name,
          url: fileUrl
        });
        return res.send(createdFile);
      }
    } catch (error: unknown) {
      return next(error);
    }

    return next(ApiError.internal('Internal Error'));
  }
}

export default new FilesController();
