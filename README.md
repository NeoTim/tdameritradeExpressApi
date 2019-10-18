# Express/TDAmeritrade Test app

Trying my hand out at an express.js app to interact with the TDAmeritrade app. Needed quotes and account data for desktop applications and couldn't find a way to get it easily. Figured I could learn a little express/javacript and get the data I needed in one shot.

\*Warning - first go with Express/javascript and pre-pre-alpha/work in progress.

### Prerequisites

1. Node - 10+ should do fine.
2. Yarn
3. Postman - using that to test endpoints - use whatever you like.
4. TDAmeritrade accounts and developer account.
5. Create TDAmeritrade Application
6. Set TDA app's callback url making sure that the port is open on your machine.

### Installing

1.  clone
2.  create your own self-signed SSL certs (named certificate.pem and key.pem or change the code in server.js) and place them in the root directory of app.
3.  Edit .env file to include callback url from #6 above as well as the Consumer Key + @AMER.OAUTH. There is a .env.example in there with the keys needed.

## License

This project is licensed under the MIT License
