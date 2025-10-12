import { createUser, getAllUsers, getUserById, updateUser, deleteUser, login } from "./service.mjs";

export const handler = async (event) => {
    // TODO implement
    const { httpMethod, pathParameters } = event
    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };
    
    try{
        if (httpMethod === "GET" && !!pathParameters ) {
            const data = await getUserById(pathParameters.userId)
            response.body = JSON.stringify(data)
        }
    
        else if (httpMethod === "GET") {
            const data = await getAllUsers()
            response.body = JSON.stringify(data)
        }
    
        else if (httpMethod === "POST") {
            const data = await createUser(JSON.parse(event.body))
            response.body = JSON.stringify(data)
        }
        return response

    } catch (error) {
        console.log(error)
        response.statusCode = 400
        response.body = JSON.stringify(error.message)
        return response
    }
};