import {Router} from 'express';
import * as Controller from './user.controller.js';
import auth from '../../middleware/auth.js';
const router =Router();

router.post('/',Controller.register)
router.post('/login',Controller.login)
router.get('/:id',Controller.getUser)
router.patch('/',auth,Controller.UpdateUser)
router.delete('/',auth,Controller.deleteUser)
export default router;