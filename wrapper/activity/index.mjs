import {
  createActivity,
  getActivities,
  getJoinedActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  addMember,
  deleteMember
} from './service.mjs';

// ---------- Lambda Handler ----------
export const handler = async (event) => {
  try {
    const { httpMethod, path, body } = event;
    let requestBody = {};

    if (body) {
      try {
        requestBody = JSON.parse(body);
      } catch (e) {
        return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON body" }) };
      }
    }

    if (httpMethod === "POST") response.headers = {
      "Access-Control-Allow-Origin": "*", // สำคัญมาก
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
    }

    // POST activity/create
    if (httpMethod === "POST" && path === "/activity/create") {
      const data = await createActivity(requestBody);
      return { statusCode: 201, body: JSON.stringify({ message: "Create Activity Successfully" }) };
    }

    // GET activity/user/:id
    if (httpMethod === "GET" && path.startsWith("/activity/user/") && !path.includes("/join/")) {
      const userId = path.split("/").pop();
      const data = await getActivities(userId);
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    // GET activity/user/join/:id
    if (httpMethod === "GET" && path.startsWith("/activity/user/join/")) {
      const userId = path.split("/").pop();
      const data = await getJoinedActivities(userId);
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    // GET activity/:id
    if (httpMethod === "GET" && path.startsWith("/activity")) {
      const id = path.split("/").pop();
      const data = await getActivityById(id);
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    // PUT activity/:id
    if (httpMethod === "PUT" && path.startsWith("/activity")) {
      const id = path.split("/").pop();
      const data = await updateActivity(id, requestBody);
      if (!data || data.length === 0) {
        return { statusCode: 404, body: JSON.stringify({ error: "Activity not found" }) };
      }
      return { statusCode: 200, body: JSON.stringify({ message: "Update Activity Successfully" }) };
    }

    // DELETE activity/:id
    if (httpMethod === "DELETE" && path.startsWith("/activity")) {
      const id = path.split("/").pop();
      const data = await deleteActivity(id);
      if (!data || data.length === 0) {
        return { statusCode: 404, body: JSON.stringify({ error: "Activity not found" }) };
      }
      return { statusCode: 200, body: JSON.stringify({ message: "Deleted Successfully" }) };
    }

    // POST activity/member
    if (httpMethod === "POST" && path === "/activity/member") {
      const data = await addMember(requestBody);
      return { statusCode: 201, body: JSON.stringify({ message: "AddMember Successfully" }) };
    }

    // DELETE activity/member/:id
    if (httpMethod === "DELETE" && path.startsWith("/activity/member")) {
      const id = path.split("/").pop();
      const data = await deleteMember(id);
      if (!data || data.length === 0) {
        return { statusCode: 404, body: JSON.stringify({ error: "Not Found" }) };
      }
      return { statusCode: 200, body: JSON.stringify({ message: "Deleted Successfully" }) };
    }

    // Default
    return { statusCode: 404, body: JSON.stringify({ error: "Route not found" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
