import { Router } from 'express';
import hosting from './hosting';

const router = Router();

router.use('/hosting', hosting);

export default router;


