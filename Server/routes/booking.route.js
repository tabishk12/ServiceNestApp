import express from "express";
import { createBooking, getBookings,getProvidersBookings,updateOrderStatus,getSingleBooking, createRating} from "../controllers/booking.controller.js";
const router = express.Router();
router.get('/:id', getSingleBooking);
router.get("/history/:userId", getBookings);
router.get("/ProviderBooking/:ProviderId", getProvidersBookings);
router.post("/", createBooking);
router.put('/:id/status',updateOrderStatus);
router.put('/:id/createRating',createRating)
export default router;

