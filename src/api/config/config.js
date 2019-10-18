import dotenv from "dotenv";
import NodeCache from "node-cache";

// TODO:  Not sure what the redundancy cycle is here....
import refreshAccessToken from "../lib/refreshAccessToken";

/**
 * create local cache to hold imported env variables as well as the tokens used for the app.
 */
const cache = new NodeCache({ stdTTL: 0, checkperiod: 30 }); // set expiration checks to 30 seconds. Change for production
dotenv.config();
cache.set("CLIENT_ID", process.env.CLIENT_ID, 0); // No timeout for the client-id
cache.set("CALLBACK_URL", process.env.CALLBACK_URL, 0);
cache.set("PORT", process.env.PORT, 0);
cache.set("SSL_PORT", process.env.SSL_PORT, 0);

/**
 * need to refresh the access_token when it expires after 30 minutes
 */
cache.on("expired", async key => {
  // TODO - handle error better.  the API will fail from here on out...
  if (key === "access_token") {
    try {
      await refreshAccessToken();
    } catch (error) {
      throw new Error("Failed to refresh the access_token", error);
    }
  }
});

export default cache;
