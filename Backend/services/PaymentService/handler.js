import express from "express";
import { createPayment, deletePayment, getPaymentById, updatePayment} from "./paymentService.js";

const router = express.Router();

//create payment
router.post("/payment", async (req, res) => {
    try {
        const payment = await createPayment(req.body);
        res.status(201).json(payment);

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})

//get payment by id
router.get("/:id", async (req, res) => {
    try {
        const payment = await getPaymentById(req.params.id);
        res.status(200).json(payment);

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})


// update payment
router.put("/:id", async (req, res) => {
    try {
        const payment = await updatePayment(req.params.id, req.body);
        res.status(200).json(payment);

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})


// delete payment
router.delete("/:id", async (req, res) => {
    try {
        const payment = await deletePayment(req.params.id);
        res.status(200).json(payment);

    }catch (err) {
        res.status(500).json( {error: err.message});
    }
})

export default router;