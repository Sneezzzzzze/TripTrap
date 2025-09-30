// handler.js 
import express from "express";
import { createActivity,
    getActivity, 
    getActivityById, 
    updateActivity, 
    deleteActivity,
    addMember

} from "./activityService.js";


const router = express.Router();

// สร้างกิจกรรม
router.post("/create", async (req, res) => {
  try {
    const activity = await createActivity(req.body);

    if(activity){
        res.status(201).json({
            message: "success",
            data : activity
        });
    }

  } catch (err) {

    res.status(500).json({ error: err.message });

  }
})


// get by user_id
router.get("/user/:id", async (req, res) => {
    try {
        const activities = await getActivity(req.params.id);
        
        if (!activities || activities.length === 0) {
            return res.status(404).json({ error: "Activity not found" });
        }

        
        res.status(200).json({
            message: "success",
            data : activities
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// get by id
router.get("/:id", async (req, res) => {
    try {
        const activities = await getActivityById(req.params.id);
        if (!activities || activities.length === 0) {
            return res.status(404).json({ error: "Activity not found" });
        }

        
         res.status(200).json({
            message: "success",
            data : activities
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// update
router.put("/:id", async (req, res) => {
    try {
        const result = await updateActivity(req.params.id, req.body);
        
        if (result){
            res.status(200).json({
                message: "update successfully",
            });
        }
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }  
})



// delete
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteActivity(req.params.id);
        if (result){
            res.status(200).json({
                message: "deleted successfully",
            });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
})


// add member
router.post('/member', async (req, res) => {
    try {
        const result = await addMember(req.body);
        if(result){
            res.status(201).json({
                message: "success",
                data : result
        });
    }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
})

export default router;