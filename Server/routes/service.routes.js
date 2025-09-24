import express from 'express';
import { getAllServices, getProvidersByService,AvailableServices,RegisterService, DeleteService } from '../controllers/service.controller.js';

const router = express.Router();

router.get('/services', getAllServices);
router.get('/services/:id/providers', getProvidersByService);
router.get('/services/available/:userId', AvailableServices);
router.post('/services/register', RegisterService);
router.delete('/services/delete',DeleteService)
export default router;
