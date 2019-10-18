import axios from "axios";

export const getRange = async (req, res) => {
  console.log("getquote", req.body);
  try {
    const { symbol, start, end } = req.body;
    if (!symbol || !start || !end) {
      throw new Error("must include non-null symbol, start and end");
    }
    // convert start and end to milleseconds
    let quoteStart = new Date(start);
    quoteStart = quoteStart.getTime().toString();
    let quoteEnd = new Date(end);
    quoteEnd = quoteEnd.getTime().toString();
    const quoteSymbol = symbol.toUpperCase();
    const apikey = "AXWECIF1XE6KCPD3SANMD0EFETSM2E4N";
    const url = `https://api.tdameritrade.com/v1/marketdata/${quoteSymbol}/pricehistory?apikey=${apikey}&endDate=${quoteEnd}&startDate=${quoteStart}`;
    console.log(url);
    const data = await axios.get(url);
    console.log(data.data);
    res.status(500).send({ quoteSymbol, quoteStart, quoteEnd });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export const getQuote = async (req, resp) => {};
