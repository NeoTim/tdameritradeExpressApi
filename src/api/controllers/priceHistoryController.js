import request from "request";

import cache from "../config/config";
/**
 * Retrieve X years worth of historical candles by day.
 * @param {*} req
 * @param {*} res
 */
export const yearsWithDaily = (req, res) => {
  const { symbol, years } = req.body;
  // todo - get some parameter error handling in here...

  const access_token = cache.get("access_token");

  const options = {
    url: `https://api.tdameritrade.com/v1/marketdata/${symbol}/pricehistory`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    qs: {
      periodType: "year",
      period: years,
      frequencyType: "daily",
      frequency: "1",
    },
  };
  // Post Access Token request to TDA.
  request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { candles } = JSON.parse(body);
      res.status(200).send(candles);
    } else {
      res.status(400).send("error occured");
    }
  });
};

/**
 * Retrieve X years worth of historical candles by week.
 * @param {*} req
 * @param {*} res
 */
export const yearsWithWeekly = (req, res) => {};
