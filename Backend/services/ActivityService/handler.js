// handler.js 
import express from "express";
import { createActivity} from "./activityService.js";


const router = express.Router();

// สร้างกิจกรรม
router.post("/create", async (req, res) => {
  try {
    const activity = await createActivity(req.body);
    res.status(201).json(activity);

  } catch (err) {

    res.status(500).json({ error: err.message });
    
  }
})