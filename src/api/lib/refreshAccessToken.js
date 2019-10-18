import request from "request";
import cache from "../config/config";

// TODO: check to make sure we have a valid refresh token, if not, redirect the system to re-login and get new pair.

/**
 * get a new access_token from TD Ameritrade using the refresh_token.
 */
const refreshAccessToken = async () => {
  console.log("refreshing expired access_token");
  const options = {
    url: "https://api.tdameritrade.com/v1/oauth2/token",
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    form: {
      grant_type: "refresh_token",
      refresh_token: cache.get("refresh_token"),
      client_id: cache.get("CLIENT_ID"),
    },
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // see Post Access Token response summary for what authReply contains
      const { access_token } = JSON.parse(body);
      cache.set("access_token", access_token, 1680); // 28 minute expiration (standard is 30 but dont let TD token expire)
      console.log("access_token refreshed", cache.get("access_token"));
      return true;
    }
    throw new Error("could not get new token", error);
  });
};

export default refreshAccessToken;
