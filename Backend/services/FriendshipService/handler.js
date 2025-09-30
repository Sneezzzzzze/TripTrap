import express from "express";
import {
    createFriendship,
    getAllFriends,
    getSentRequests,
    getReceivedRequests,
    updateFriendshipStatus,
    deleteFriendship,
} from "./friendshipService.js";

const router = express.Router();

// ส่งคำขอเป็นเพื่อน
router.post("/", async (req, res) => {
    try {
        const friendship = await createFriendship(req.body);
        res.status(201).json({
            message: "success",
            data: friendship,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ดูเพื่อนทั้งหมดของ user
router.get("/friends/:userId", async (req, res) => {
    try {
        const friends = await getAllFriends(req.params.userId);
        res.status(200).json({
            message: "success",
            data: friends,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ดูคำขอที่เราได้ส่งไป (Pending)
router.get("/sent/:userId", async (req, res) => {
    try {
        const sentRequests = await getSentRequests(req.params.userId);
        res.status(200).json({
            message: "success",
            data: sentRequests,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ดูคำขอที่เรารับมา (Pending)
router.get("/received/:userId", async (req, res) => {
    try {
        const receivedRequests = await getReceivedRequests(req.params.userId);
        res.status(200).json({
            message: "success",
            data: receivedRequests,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// อัปเดตสถานะคำขอ (Accept / Reject)
router.put("/:id", async (req, res) => {
    try {
        const friendship = await updateFriendshipStatus(
            req.params.id,
            req.body.status
        );
        res.status(200).json({
            message: "update successfully",
            data: friendship,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ลบคำขอหรือยกเลิก/เลิกเป็นเพื่อน
router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteFriendship(req.params.id);
        res.status(200).json({
            message: "deleted successfully",
            data: result,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
