import { createUser, searchUsers, getUserById, updateUser, deleteUser, login, verifyToken } from "./service.mjs";

export const handler = async (event) => {
    // TODO implement
    const { httpMethod, pathParameters, path, headers } = event

    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };

    try {
        if (httpMethod === "POST") response.headers = {
            "Access-Control-Allow-Origin": "*", // สำคัญมาก
        }

        if (httpMethod === "GET" && !!pathParameters) {
            if (pathParameters.userId) {
                const data = await getUserById(pathParameters.userId)
                response.body = JSON.stringify(data)
            } else if (pathParameters.keyword) {
                const data = await searchUsers(pathParameters.keyword)
                response.body = JSON.stringify(data)
            }
        }

        else if (httpMethod === "POST" && path == "/user/credential") {
            const data = await login(JSON.parse(event.body))
            response.body = JSON.stringify(data)
        }

        else if (httpMethod === "POST" && path == "/user/verify" && !!headers.Authorization) {
            const data = await verifyToken(headers.Authorization)
            response.body = JSON.stringify(data)
        }

        else if (httpMethod === "POST") {
            // { username, first_name, last_name, email, password }
            const data = await createUser(JSON.parse(event.body))
            response.body = JSON.stringify(data)
        }

        else response.body = JSON.stringify("Invalid Request")
        return response

    } catch (error) {
        console.log(error)
        response.statusCode = 400
        response.body = JSON.stringify(error.message)
        return response
    }
};