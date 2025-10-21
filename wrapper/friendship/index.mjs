import {
    createFriendship,
    getAllFriends,
    getSentRequests,
    getReceivedRequests,
    updateFriendshipStatus,
    deleteFriendship,
} from "./service.mjs";

export const handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello"),
    };
    try {
        const { httpMethod, path, pathParameters, body } = event;
        console.log(path, pathParameters);

        // POST /friendship - send friend request
        if (
            httpMethod === "POST"
        ) {
            const friendship = await createFriendship(JSON.parse(body));
            response.statusCode = 201;
            response.body = JSON.stringify({ message: "success", data: friendship });
        }

        // GET /friendship/{userId} - get all friends
        else if (
            httpMethod === "GET" && /\/friendship\/[^/]+$/.test(path) &&
            !!pathParameters
        ) {
            const friends = await getAllFriends(pathParameters.userId);
            response.body = JSON.stringify(friends);
            return response
        }

        // GET /friendship/sent/{userId} - get sent requests
        else if (
            httpMethod === "GET" && /\/friendship\/sent\/[^/]+$/.test(path) &&
            !!pathParameters
        ) {
            const sentRequests = await getSentRequests(pathParameters.userId);
            response.body = JSON.stringify(sentRequests);
            return response
        }

        // GET /friendship/received/{userId} - get received requests
        else if (
            httpMethod === "GET" &&
            /\/friendship\/received\/[^/]+$/.test(path) &&
            pathParameters && pathParameters.userId
        ) {
            const receivedRequests = await getReceivedRequests(pathParameters.userId);
            response.body = JSON.stringify(receivedRequests);
        }

        // PATCH /friendship/{id} - update friendship status
        else if (
            httpMethod === "PATCH" &&
            /\/friendship\/[^/]+$/.test(path) &&
            pathParameters && pathParameters.id
        ) {
            const { status } = JSON.parse(body);
            const friendship = await updateFriendshipStatus(pathParameters.id, status);
            response.body = JSON.stringify({ message: "update success", data: friendship });
        }

        // DELETE /friendship/{id} - delete friendship
        else if (
            httpMethod === "DELETE" &&
            /\/friendship\/[^/]+$/.test(path) &&
            pathParameters && pathParameters.userId
        ) {
            const result = await deleteFriendship(pathParameters.userId);
            response.body = JSON.stringify({ message: "deleted success", data: result });
        }

        // Fallback route not found
        else {
            response.statusCode = 404;
            response.body = JSON.stringify({ error: "Route not found" });
        }

        return response;

    } catch (error) {
        response.statusCode = 500;
        response.body = JSON.stringify({ error: error.message });
        return response;
    }
};

