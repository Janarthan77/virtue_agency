import { Router } from "express";
import {
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} from "../controllers/enquiries.controller.js";

const router = Router();

router.get("/", getEnquiries);
router.post("/", createEnquiry);
router.patch("/:id", updateEnquiry);
router.put("/:id", updateEnquiry);
router.delete("/:id", deleteEnquiry);

export default router;
