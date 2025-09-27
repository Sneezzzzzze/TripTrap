import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "./userService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const user = await updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
