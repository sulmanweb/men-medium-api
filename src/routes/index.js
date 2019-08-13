import {Router} from 'express'

const router = Router();

router.get('/', (req, res, next) => {
  res.send({message: 'welcome to medium api'})
});

export default router;
