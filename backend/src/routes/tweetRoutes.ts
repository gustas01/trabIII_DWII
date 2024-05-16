import { Router } from 'express';
import tweetController from '../controllers/tweetController';
import loginRequired from '../middlewares/loginRequired';
import createTweetValidations from '../middlewares/createTweetValidations';

const router = Router();

router.post('/', createTweetValidations, loginRequired.validate, tweetController.create);
router.get('/', loginRequired.validate, tweetController.findAllFromAuthor);
router.get('/all', loginRequired.validate, tweetController.findAll);
router.put('/:id', createTweetValidations, loginRequired.validate, tweetController.update);
router.delete('/:id', loginRequired.validate, tweetController.delete);

export default router;
