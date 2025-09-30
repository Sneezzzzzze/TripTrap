import express from "express";
import { createWallet, deleteWallet, getWalletById, updateWallet } from "./walletService.js";

const router = express.Router();

//create wallet
router.post("/wallet", async (req, res) => {
    try {
        const wallet = await createWallet(req.body);
        res.status(201).json(wallet);

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})

//get wallet by id
router.get("/:id", async (req, res) => {
    try {
        const wallet = await getWalletById(req.params.id);
        res.status(200).json(wallet);

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})


// update wallet
router.put("/:id", async (req, res) => {
    try {
        const wallet = await updateWallet(req.params.id, req.body);
        res.status(200).json(wallet);

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})


// delete wallet
router.delete("/:id", async (req, res) => {
    try {
        const wallet = await deleteWallet(req.params.id);
        res.status(200).json(wallet);

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})

export default router;