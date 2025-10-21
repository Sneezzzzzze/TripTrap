import {
  createWallet,
  deleteWallet,
  getWalletById,
  updateWallet,
  getWallet,
} from "./service.mjs";

export const handler = async (event) => {
  const { httpMethod, path, pathParameters, body } = event;

  const response = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: "",
  };

  try {
    // ✅ POST /wallet
    if (httpMethod === "POST" && path === "/wallet") {
      const data = await createWallet(JSON.parse(body));
      response.statusCode = 201;
      response.body = JSON.stringify({ message: "success", data });
    }

    // ✅ GET /wallet/{id}
    else if (httpMethod === "GET" && path.match(/^\/wallet\/[\w-]+$/)) {
      const id = pathParameters?.id;
      const data = await getWalletById(id);

      if (!data || data.length === 0) {
        response.statusCode = 404;
        response.body = JSON.stringify({ error: "Wallet not found" });
      } else {
        response.body = JSON.stringify({ message: "success", data });
      }
    }

    // ✅ GET /wallet/user/{id}
    else if (httpMethod === "GET" && path.match(/^\/wallet\/user\/[\w-]+$/)) {
      const id = pathParameters?.id;
      const data = await getWallet(id);

      if (!data || data.length === 0) {
        response.statusCode = 404;
        response.body = JSON.stringify({ error: "Wallet not found" });
      } else {
        response.body = JSON.stringify({ message: "success", data });
      }
    }

    // ✅ PUT /wallet/{id}
    else if (httpMethod === "PUT" && path.match(/^\/wallet\/[\w-]+$/)) {
      const id = pathParameters?.id;
      const data = await updateWallet(id, JSON.parse(body));

      if (!data || data.length === 0) {
        response.statusCode = 404;
        response.body = JSON.stringify({ error: "Wallet not found" });
      } else {
        response.body = JSON.stringify({ message: "update successfully" });
      }
    }

    // ✅ DELETE /wallet/{id}
    else if (httpMethod === "DELETE" && path.match(/^\/wallet\/[\w-]+$/)) {
      const id = pathParameters?.id;
      const data = await deleteWallet(id);

      if (!data || data.length === 0) {
        response.statusCode = 404;
        response.body = JSON.stringify({ error: "Wallet not found" });
      } else {
        response.body = JSON.stringify({ message: "deleted successfully" });
      }
    }

    // ❌ Route not found
    else {
      response.statusCode = 404;
      response.body = JSON.stringify({ error: "Route not found" });
    }

    return response;
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.body = JSON.stringify({ error: error.message });
    return response;
  }
};

