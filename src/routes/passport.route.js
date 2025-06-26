import { Router } from "express";
import { PassportController } from "../controllers/passport.controller.js";
import {AuthGuard} from '../guards/auth.guard.js'
import {RolesGuard} from '../guards/roles.guard.js'
import {SelfGuard} from '../guards/self.guard.js'
const router= Router();
const contoller = new PassportController()

router
    .post('/',contoller.createPassport)
    .get('/',AuthGuard,RolesGuard(['superadmin']),contoller.getAllPassports)
    .get('/:id',AuthGuard,SelfGuard,contoller.getPassportById)
    .patch('/:id',AuthGuard,SelfGuard,contoller.updatePassportById)
    .delete('/:id',AuthGuard,RolesGuard(['superadmin']),contoller.deletePassportById)

export default router;