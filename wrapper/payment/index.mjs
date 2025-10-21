import { getPaymentByActivityID, createPayment, calculateMoney, deletePayment } from "./service.mjs";

export const handler = async (event) => {
    const { httpMethod, pathParameters, path, headers } = event

    const response = {
        statusCode: 200,
        body: JSON.stringify(event),
    };

    try {
        if (httpMethod === "POST") response.headers = {
            "Access-Control-Allow-Origin": "*", // สำคัญมาก
        }

        if (httpMethod === "GET" && !!pathParameters.id) {
            const data = await getPaymentByActivityID(id, pathParameters.id)
            response.body = JSON.stringify(data)
        }
        
        else if (httpMethod === "GET" && path === "/total_money" && !!pathParameters.activity_id) {
            const data = await calculateMoney(pathParameters.activity_id)
            response.body = JSON.stringify(data)
        }

        else if (httpMethod === "POST") {
            // { userId, activityId, amount, paidAt, note, imagePath }
            const data = await createPayment(JSON.parse(event.body))
            response.body = JSON.stringify(data)
        }

        else if (httpMethod === "DELETE"){
            // id
            const data = await deletePayment(JSON.parse(event.body))
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