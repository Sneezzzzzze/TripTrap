import express from "express";
import { createWallet, deleteWallet, getWalletById, updateWallet, getWallet } from "./walletService.js";

const router = express.Router();

//create wallet
router.post("/", async (req, res) => {
    try {
        const wallet = await createWallet(req.body);
        
        if(wallet){
            res.status(201).json({
                message: "success",
                data : wallet
            });
        }

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})

//get wallet by id
router.get("/:id", async (req, res) => {
    try {
        const wallet = await getWalletById(req.params.id);

        if (!wallet || wallet.length === 0) {
            return res.status(404).json({ error: "Wallet not found" });
        }

        
        res.status(200).json({
            message: "success",
            data : wallet
        });

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})

//get wallet by user_id 
router.get("/user/:id", async (req, res) => {
    try {
        const wallet = await getWallet(req.params.id);

        if (!wallet || wallet.length === 0) {
            return res.status(404).json({ error: "Wallet not found" });
        }

        
        res.status(200).json({
            message: "success",
            data : wallet
        });

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})


// update wallet
router.put("/:id", async (req, res) => {
    try {
        const result = await updateWallet(req.params.id, req.body);
        
        if (result){
            res.status(200).json({
                message: "update successfully",
            });
        }

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})


// delete wallet
router.delete("/:id", async (req, res) => {
    
    try {

        const result = await deleteWallet(req.params.id);

        if (result){
            res.status(200).json({
                message: "deleted successfully",
            });
        }

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})

export default router;