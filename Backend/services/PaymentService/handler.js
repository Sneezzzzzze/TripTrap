import express from "express";
import { createPayment, 
    getPaymentById, 
    getPaymentByActivityID, 
    getPaymentByActivityUserID,
    updatePayment, 
    deletePayment } from "./paymentService.js";

const router = express.Router();

//create payment
router.post("/", async (req, res) => {
    try {
        const payment = await createPayment(req.body);

        if(payment){
            res.status(201).json({
                message: "success",
                data : payment
            });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//get payment by id
router.get("/:id", async (req, res) => {
    try {
        const payment = await getPaymentById(req.params.id);
        if (!payment || payment.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }

        
         res.status(200).json({
            message: "success",
            data : payment
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//get payment by activity_id
router.get("/activity/:id", async (req, res) => {
    try {
        const payments = await getPaymentByActivityID(req.params.id);

        if (!payments || payments.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }

         res.status(200).json({
            message: "success",
            data : payments
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//get payment by activity_id
router.get("/activity/:id", async (req, res) => {
    try {
        const payments = await getPaymentByActivityID(req.params.id);

        if (!payments || payments.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }

         res.status(200).json({
            message: "success",
            data : payments
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//get payment by activity_id and user_id
router.get("/user/:user_id/activity/:activity_id", async (req, res) => {
    try {
        const payments = await getPaymentByActivityUserID(req.params.user_id, req.params.activity_id);

        if (!payments || payments.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }

         res.status(200).json({
            message: "success",
            data : payments
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// update payment
router.put("/:id", async (req, res) => {
    try {
        const result = await updatePayment(req.params.id, req.body);

        if (!result || result.length === 0){
             return res.status(404).json({ error: "Payment not found" });
        }

        res.status(200).json({
            message: "update successfully",
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// delete payment
router.delete("/:id", async (req, res) => {
    try {
        const result = await deletePayment(req.params.id);

        if (!result || result.length === 0){
             return res.status(404).json({ error: "Payment not found" });
        }

        res.status(200).json({
            message: "deleted successfully",
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

export default router;