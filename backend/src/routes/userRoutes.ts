import { Router } from 'express';
import userController from '../controllers/userController';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/me', loginRequired.validate, userController.me);
router.put('/', loginRequired.validate, userController.update);
router.delete('/', loginRequired.validate, userController.delete);

export default router;
