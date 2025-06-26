import { Router } from "express";
import { TransportController } from "../controllers/transport.controller.js";
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";
const router= Router();

const controller = new TransportController();
router
.post("/",AuthGuard,RolesGuard(['superadmin']), controller.createTransport)
.get("/",AuthGuard,RolesGuard(['superadmin']), controller.getAllTransports)
.get("/:id",AuthGuard, controller.getTransportById)
.patch("/:id", controller.updateTransportById)
.delete("/:id", controller.deleteTransportById);

export default router;