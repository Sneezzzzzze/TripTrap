import { initialDatabase } from "./service.mjs";

export const handler = async (event) => {
    // TODO implement
    const { httpMethod } = event
    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };
    
    try{
        if (httpMethod === "POST") {
            const message = await initialDatabase()
            response.body = message
        }
        return response

    } catch (error) {
        console.log(error)
        response.statusCode = 400
        response.body = JSON.stringify(error.message)
        return response
    }
};