import { createAddress,
     getAddressByUserId,
     updateAddress,
     deleteAddress } from "../controllers/address.controller.js";
import {protect} from '../middlewares/auth.middleware.js';
import express from 'express';
     const router = express.Router();

// Route to create a new address
router.post('/create', createAddress); 

// Route to get addresses by user ID
router.get('/:userId', getAddressByUserId);

// Route to update an address by ID
router.put('/:addressId',updateAddress);

// Route to delete an address by ID
router.delete('/:addressId',deleteAddress);

export default router;