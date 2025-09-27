// Create Wallet
export const createWallet = async (data) => {

    try {
        
        //data
        userId = data.userId; //Bank's owner
        acountNumber = data.acountNumber;
        bankName = data.bankName;

        // check data
        if (!userId || !acountNumber || !bankName) {
            throw new Error("Please provide all required fields.");
        }

        // check user
        const user = await User.findById(userId);

        if (!user){
            throw new Error("User not found.");
        }

        // create waller
        const createdWallet = await Wallet.create({
            userId : userId,
            acountNumber : acountNumber,
            bankName : bankName
        })

        if (!createdWallet) {
            throw new Error("Failed to create Wallet.")
        }

        return createdWallet;

    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}

// Get Wallet By Id
export const getWalletById = async (id) => {
    try {
        const wallet = await Wallet.findById(id);

        if (!wallet) {
            throw new Error("Wallet not found");
        }
        return wallet;
    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}

// Get All Wallet
export const getWallet = async () => {
    try {
        const wallets = await Wallet.findAll();

        if (!wallets) {
            throw new Error("No wallet created.")
        }

        return wallets;
    }
    catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}

// Update Wallet
export const updateWallet = async (id, data) => {
    try {
        // find wallet
        const wallet = await Wallet.findById(id);

        if (!wallet) {
            throw new Error("Wallet not found.");
        }

        // update wallet
        const updatedWallet = await Wallet.findByIdandUpdate(
            id, data, {new : true}
        );

        if (!updatedWallet) {
            throw new Error("Failed to update activity.")
        }

        return { message: "Wallet updated successfully" };

    } catch (error) {
        console.log("Error :", error)
        throw new error(error.message)
    }
}

// Delete Wallet
export const deleteWallet = async (id) => {
    try {
        // find wallet
        const wallet = await Wallet.findById(id);

        if (!wallet) {
            throw new Error("Wallet not found.");
        }

        // update wallet
        await Wallet.findByIdandDelete(id);

        return { message: "Wallet deleted successfully" };

    } catch (error) {
        console.log("Error :", error)
        throw new error(error.message)
    }
}