import { MongoClient } from "mongodb";

// POST /api/new-trade

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log("API Request Received");

    const data = req.body;

    try {
      const client = await MongoClient.connect(process.env.DB_URL);
      console.log("Connection made");

      const db = client.db();

      const tradesCollection = db.collection("trades");

      const result = await tradesCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: "Trade logged!" });
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
