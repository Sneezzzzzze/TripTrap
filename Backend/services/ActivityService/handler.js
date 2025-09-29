// handler.js 
import express from "express";
import { createActivity, getActivityById, updateActivity, deleteActivity} from "./activityService.js";


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

// get by id
router.get("/:id", async (req, res) => {
    try {
        const activity = await getActivityById(req.params.id);
        res.status(200).json(activity);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// update
router.put("/:id", async (req, res) => {
    try {
        const result = await updateActivity(req.params.id, req.body);
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }  
})


// delete
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteActivity(req.params.id);
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
})


export default router;