import axios from 'axios';

export async function FetchUserProfile() {
    const token = sessionStorage.getItem("token");
    try {
        const res = await axios.get("https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/user/verify", 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("test", res.data)
        return res;
    } catch (error) {
        console.error("Error fetching ProfileData:", error);
        throw error;
    }
};