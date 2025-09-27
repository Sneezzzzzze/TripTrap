// /ActivityService.js

// Create Activity
export const createActivity = async (data) => {

    try {
        
        // data 
        title = data.title;
        description = data.description;
        date = data.date;
        userId = data.userId;
        location = data.location;
        start_date = data.start_date;
        end_date = data.end_date;
        budget = data.budget;
        wallet_id = data.wallet_id;

        // เช้ค ข้อมูล
        if(!title || !description || !date || !userId || !location || !start_date || !end_date || !budget || !wallet_id){
            throw new Error("Please provide all required fields");
        }

        // เช้ค wallet
        const wallet = await Wallet.findById(wallet_id);

        if(!wallet){
            throw new Error("Wallet not found");
        }

        // สร้าง activity
        const activity = await Activity.create({
            name: title,
            start_date: start_date,
            end_date: end_date,
            description: description,
            date: date,
            userId: userId,
            location: location,
            budget: budget,
            wallet_id: wallet_id,
            user_id: userId  // ใครสร้าง
        })

        if (!activity) {
            throw new Error("Activity not created");
        }

        return activity;
        
    } catch (error) {
        
        console.log("Error :", error);
        throw new Error(error.message);
    }

    
}


// Get Activity by ID
export const getActivityById = async (id) => {
    try {

        // หา activity
        const activity = await Activity.findById(id);

        if (!activity) {
            throw new Error("Activity not found");
        }

        return activity;


    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// Update Activity
export const updateActivity = async (id, data) => {
    try {

        // หา activity
        const activity = await Activity.findById(id);
        if (!activity) {
            throw new Error("Activity not found");
        }



        // อัพเดต activity
        const updatedActivity = await Activity.findByIdAndUpdate(
            id, data, { new: true }
        );

        if (!updatedActivity) {
            throw new Error("Activity not updated");
        }


        return { message: "Activity update successfully" };


    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}


// Delete Activity
export const deleteActivity = async (id) => {
    try {
        // หา activity
        const activity = await Activity.findById(id);

        if (!activity) {
            throw new Error("Activity not found");
        }

        // ลบ activity
        await Activity.findByIdAndDelete(id);

        return { message: "Activity deleted successfully" };

    } catch (error) {
        console.log("Error :", error);
        throw new Error(error.message);
    }
}