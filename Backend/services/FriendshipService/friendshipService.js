// Create (Send friend request)


export const createFriendship = async (data) => {
    try {
        const { requester_id, receiver_id } = data;

        if (!requester_id || !receiver_id) {
            throw new Error("Please provide requester_id and receiver_id");
        }

        // check requester
        const requester = await User.findById(requester_id);
        if (!requester) {
            throw new Error("Requester not found.");
        }

        // check receiver
        const receiver = await User.findById(receiver_id);
        if (!receiver) {
            throw new Error("Receiver not found.");
        }

        // create new request
        const friendship = await Friendship.create({
            requester_id,
            receiver_id,
            status: "Pending",
        });

        if (!friendship) {
            throw new Error("Failed to create friendship request.");
        }

        return friendship;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Get all friends of a user
export const getAllFriends = async (userId) => {
    try {
        const friends = await Friendship.findAll({
            where: [
                { status: "Accepted", requester_id: userId },
                { status: "Accepted", receiver_id: userId },
            ],
        });

        return friends;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get pending friend requests sent by user เราส่งคำขอไปหาใครบ้าง
export const getSentRequests = async (userId) => {
    try {
        if (!userId) throw new Error("Please provide userId");

        const requests = await Friendship.findAll({
            where: {
                requester_id: userId,
                status: "Pending",
            },
        });

        if (!requests) {
            throw new Error("No pending sent friend requests found.");
        }

        return requests;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Get pending friend requests received by user ใครส่งคำขอมาให้เราบ้าง
export const getRecivedRequests = async (userId) => {
    try {
        if (!userId) throw new Error("Please provide userId");

        const requests = await Friendship.findAll({
            where: {
                receiver_id: userId,
                status: "Pending",
            },
        });

        if (!requests) {
            throw new Error("No pending friend requests found.");
        }

        return requests;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Update (Accept or Reject)
export const updateFriendshipStatus = async (id, status) => {
    try {
        const friendship = await Friendship.findById(id);
        if (!friendship) {
            throw new Error("Friendship not found.");
        }

        friendship.status = status;
        await friendship.save();

        // const updatedFriendshipStatus = await Friendship.findByIdandUpdate(id, data, {
        //     new: true,
        // });

        return friendship;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Delete (Cancel request or Unfriend)
export const deleteFriendship = async (id) => {
    try {
        const friendship = await Friendship.findById(id);
        if (!friendship) {
            throw new Error("Friendship not found.");
        }

        await friendship.destroy();
        return { message: "Friendship deleted successfully" };
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

// Get all friendships by user & status
// export const getFriendships = async (userId, status = null) => {
//     try {
//         const whereClause = {
//             $or: [{ requester_id: userId }, { receiver_id: userId }],
//         };
//         if (status) whereClause.status = status;

//         const friendships = await Friendship.findAll({ where: whereClause });

//         if (!friendships) {
//             throw new Error("No friendships found.");
//         }

//         return friendships;
//     } catch (error) {
//         console.log("Error:", error);
//         throw new Error(error.message);
//     }
// };
