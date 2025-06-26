import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller.js";
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";
import { SelfGuard } from "../guards/self.guard.js";
const router = Router();

const controller= new CustomerController();
router
.post('/signup',controller.signUp)
.post('/signin', controller.signIn)
.post('/confirm-signin', controller.confirmSignIn)
.post('/token',controller.newAccessToken)
.post('/logout',AuthGuard,controller.logOut)
.get('/',AuthGuard,RolesGuard(['superadmin']),controller.getAllCustomers)
.get('/:id',AuthGuard,SelfGuard,controller.getCustomerById)
.patch('/:id',AuthGuard,SelfGuard,controller.updateCustomerById)
.delete('/:id',AuthGuard,RolesGuard(['superadmin']),controller.deleteCustomerById)

export default router