import express from "express";
import {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    login,
    changePassword,
    searchUsers,
    verifyToken,
} from "./userService.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const user = await createUser(req.body);
        if (user) {
            res.status(201).json({
                message: "success",
                data: user,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const result = await login(req.body);

        res.status(200).json({
            message: "Login successful",
            token: result.token,
            data: result.user,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

router.post("/verify", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const user = await verifyToken(authHeader);

        res.status(200).json({
            message: "Token is valid",
            data: user,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

router.get("/search", async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const users = await searchUsers(keyword);

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
            message: "Update successfully",
            data: user,
        });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});


router.post("/change-password", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const user = await changePassword(req.body, authHeader);

        res.status(200).json({
            message: "Change Password successful",
            data: user,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
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
