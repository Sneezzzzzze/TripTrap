import bcrypt from "bcryptjs";

export const createUser = async (data) => {
    try {
        username = data.username;
        first_name = data.first_name;
        last_name = data.last_name;
        email = data.email;
        password = data.password;

        if (!username || !first_name || !last_name || !email || !password) {
            throw new Error("Please provide all required fields.");
        }

        const duplicate = await User.findOne({ where: { username } });
        if (duplicate) {
            throw new Error("Username already exists.");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            username,
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        if (!createdUser) {
            throw new Error("Failed to create user.");
        }

        return createdUser;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found.");
        }
        return user;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

export const getUsers = async () => {
    try {
        const users = await User.findAll();
        if (!users) {
            throw new Error("No users found.");
        }
        return users;
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

export const updateUser = async (id, data) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found.");
        }

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updatedUser) {
            throw new Error("Failed to update user.");
        }

        return { message: "User updated successfully" };
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found.");
        }
        await User.findByIdAndDelete(id);

        return { message: "User deleted successfully" };
    } catch (error) {
        console.log("Error:", error);
        throw new Error(error.message);
    }
};
