// const app = express();
// app.use(express.json());
// app.listen(3000, () => {
//   console.log("App chal raha hai bsdk..frontend bnale");
// });

// parser.on('data', (line) => {
//   console.log('${line}')
// })
// app.get("/hello", (req, res) => {
//   res.json({message: "Hello world print ho gaya..ban gaye comder!"});
//   console.log("Hello world print ho gaya..ban gaye comder!");

// });

const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 3000; // Choose the port you want to use

const uri =
  "mongodb+srv://akkadbakkad:akkadbakkad@cluster0.3dxvitq.mongodb.net/";

// Define the database and collection names
const dbName = "sensors";
const collectionName = "s1";

app.get("/data", (req, res) => {
  MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.error("Error connecting to MongoDB:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Fetch data from the collection
      collection.find({}).toArray((err, documents) => {
        if (err) {
          console.error("Error fetching data:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        // Send the fetched data as a JSON response
        res.json(documents);

        // Close the MongoDB client
        client.close();
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
