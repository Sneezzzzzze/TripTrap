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