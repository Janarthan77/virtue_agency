import { Router } from "express";
import { getCompanySettings, updateCompanySettings } from "../controllers/settings.controller.js";

const router = Router();

router.get("/", getCompanySettings);
router.put("/", updateCompanySettings);
router.post("/", updateCompanySettings);

export default router;
