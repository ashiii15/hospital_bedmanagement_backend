import express from "express";
import { createBed, deleteBed, editBed, getBeds } from "../controllers/bedController";
import { serverHealth } from "../controllers/serverHewalthControl";

const router = express.Router();

router.post("/beds/add", createBed);
router.get("/bedsdetails", getBeds);
router.delete("/deletebed/:id", deleteBed);
router.patch("/updatebed/:id", editBed);
router.get("/health",serverHealth)


export default router;
