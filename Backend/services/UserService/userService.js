import bcrypt from "bcryptjs";

export const createUser = async (data) => {
    try {
        const { username, first_name, last_name, email, password } = data;

        if (!username || !first_name || !last_name || !email || !password) {
            throw new Error("Please provide all required fields");
        }
        const duplicate = await User.findOne({
            where: {
                username,
                // email
            },
        });
        if (duplicate) throw new Error("Username or Email already exists");
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });
        if (!user) throw new Error("User not created");
        return user;
    } catch (error) {
        console.error("Error in createUser:", error);
        throw new Error(error.message);
    }
};

export const getUsers = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found");
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateUser = async (id, data) => {
    try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found");

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        await user.update({ ...data });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found");
        await user.destroy();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};
