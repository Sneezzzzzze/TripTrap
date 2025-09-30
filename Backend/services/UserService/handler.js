import express from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "./userService.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            message: "success",
            data: user,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({
            message: "success",
            data: users,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json({
            message: "success",
            data: user,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.status(200).json({
            message: "update successfully",
            data: user,
        });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(200).json({
            message: "deleted successfully",
            data: user,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
