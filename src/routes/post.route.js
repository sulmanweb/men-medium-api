import {Router} from 'express'
import postController from '../controllers/posts.controller'
import {authenticateUser} from '../lib/auth'

const router = Router();

router
  .route('/')
  .get(postController.index)
  .post(authenticateUser, postController.create);

router.get('/my_posts', authenticateUser, postController.myPosts);

router
  .route('/:id')
  .put(authenticateUser, postController.update)
  .get(postController.show)
  .delete(authenticateUser, postController.destroy);

export default router;