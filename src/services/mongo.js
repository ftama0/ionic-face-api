const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fryatama:IBsd30gPnqKwNBha@approval-system.pkz0llq.mongodb.net/?retryWrites=true&w=majority&appName=approval-system";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
const port = process.env.PORT || 3000;

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error(e);
  }
}
run().catch(console.dir);

app.get('/data', async (req, res) => {
  try {
    const database = client.db("your-database-name");
    const collection = database.collection("your-collection-name");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
