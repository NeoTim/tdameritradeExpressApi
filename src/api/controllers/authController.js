import request from "request";
import cache from "../config/config";

/**
 * Get TDA access_token and refresh_token.  Will require that the user intervenes and logs
 * into TD.
 * @param {*} req
 * @param {*} res
 */
export const token = (req, res) => {
  const options = {
    url: "https://api.tdameritrade.com/v1/oauth2/token",
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    form: {
      grant_type: "authorization_code",
      access_type: "offline",
      code: req.query.code,
      client_id: cache.get("CLIENT_ID"),
      redirect_uri: cache.get("CALLBACK_URL"),
    },
  };
  // Post Access Token request to TDA.
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      // see Post Access Token response summary for what authReply contains
      const { access_token, refresh_token } = JSON.parse(body);
      cache.set("access_token", access_token, 20); // 28 minute expiration.
      cache.set("refresh_token", refresh_token, 7776000000); // 90 day expiration.
      res.status(200).send("access token and refresh token received");
    } else {
      res.status(400).send("error occured");
    }
  });
};

/**
 * starting the app, need to login first, send the url to the user.
 */
export const login = (req, res) => {
  res.set("Content-Type", "text/html");
  res
    .status(200)
    .send(
      '<a href="https://auth.tdameritrade.com/oauth?client_id=AXWECIF1XE6KCPD3SANMD0EFETSM2E4N@AMER.OAUTHAP&response_type=code&redirect_uri=https://127.0.0.1:3000/auth/token">Click Here to Login</a>'
    );
};
