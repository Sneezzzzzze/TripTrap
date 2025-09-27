//Create Payment
const createpayment = async (data) => {
    try {

        //data
        userId = data.userId;
        activityId = data.activityId;
        amount = data.amount;
        paidAt = data.paidAt;
        slipUrl = data.slipUrl;

        //check data
        if (!userId, !activityId, !amount, !paidAt, !slipUrl) {
            throw new Error("Please provide all required fields.")
        }

        // check user
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found.");
        }

        //create payment
        const createdPayment = await Payment.create({
            userId : data.userId,
            activityId : data.activityId,
            amount : data.amount,
            paidAt : data.paidAt,
            slipUrl : data.slipUrl
        })

        if (!createdPayment) {
            throw new Error("Failed to create Payment.")
        }

        return createdPayment;

    } catch (err) {
        console.log("Error :", err);
        throw new Error(err.message);
    }
}

//Get Payment By Id
export const getPaymentById = async (id) => {
    try {
        const payment = await Payment.findById(id);

        if (!payment) {
            throw new Error("Payment not found");
        }
        return payment;
    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}

// Get All Payments
export const getPayment = async () => {
    try {
        const payments = await Payment.findAll();

        if (!payments) {
            throw new Error("No payment created.")
        }

        return payments;
    }
    catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// Update Payment
export const updatePayment = async (id, data) => {
    try {
        // find payment
        const payment = await Payment.findById(id);

        if (!payment) {
            throw new Error("Payment not found.");
        }

        // update payment
        const updatedPayment = await Payment.findByIdandUpdate(
            id, data, {new : true}
        );

        if (!updatedPayment) {
            throw new Error("Failed to update activity.")
        }

        return { message: "Payment updated successfully" };

    } catch (error) {
        console.log("Error :", error)
        throw new error(error.message)
    }
}

// Delete Payment
export const deletePayment = async (id) => {
    try {
        // find payment
        const payment = await Payment.findById(id);

        if (!payment) {
            throw new Error("Payment not found.");
        }

        // update payment
        await Payment.findByIdandDelete(id);

        return { message: "Payment deleted successfully" };

    } catch (error) {
        console.log("Error :", error)
        throw new error(error.message)
    }
}
