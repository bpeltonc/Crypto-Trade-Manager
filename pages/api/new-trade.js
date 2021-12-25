import { MongoClient } from "mongodb";

// POST /api/new-trade

const handler = async (req, res) => {
  if (req.method === "POST") {
    const dbUrl = process.env.DB_URL;

    const data = req.body;

    const client = await MongoClient.connect(dbUrl);
    const db = client.db();

    const tradesCollection = db.collection("trades");

    const result = await tradesCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Trade logged!" });
  }
};

export default handler;
