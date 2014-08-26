CoinSpy is an app that allows users to set and receive email and text message alerts based on the market prices for Bitcoin, Dogecoin, and Litecoin. The bid, ask, and last prices are being pulled from the Firebase Open Data Set for Cryptocurrencies. Parse is being used for the backend. 

v2: A Parse background job will run every 15 seconds to compare the prices of set alerts to current prices. When the alerts are triggered, the Mandrill and Twilio APIs will be used to send email and SMS notifications.
