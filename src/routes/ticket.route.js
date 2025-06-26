import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller.js";
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";
import { SelfGuard } from "../guards/self.guard.js";
const router = Router();

const controller = new TicketController();
router
    .post('/',AuthGuard,RolesGuard(['superadmin']),controller.createTicket)
    .get('/',AuthGuard,RolesGuard(['superadmin']),controller.getAllTickets)
    .get('/:id',AuthGuard,SelfGuard,controller.getTicketById)
    .patch('/:id',AuthGuard,RolesGuard(['superadmin']),controller.updateTicket)
    .delete('/:id',AuthGuard,RolesGuard(['superadmin']),controller.deleteTicketById)

    export default router;