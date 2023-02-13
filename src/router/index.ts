import express, { Express } from 'express';
import ProductController from '../controllers/ProductController';
import FilesController from '../controllers/FilesController';

const router: Express = express();

router.post('/api/files', FilesController.create);
router.post('/api/products', ProductController.create);
router.put('/api/products/:id', ProductController.update);
router.get('/api/products', ProductController.getAll);
router.get('/api/products/:id', ProductController.getById);
router.delete('/api/products/:id', ProductController.removeById);

export default router;
