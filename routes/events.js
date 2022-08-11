import express from "express";
import { Router } from "express";
import { MongoClient, ObjectId } from "mongodb";



const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "DT";

try {
  await client.connect();
  console.log("Successfully connected to DT Database...");
} catch (e) {
  console.log(e);
}

const DT_Collection = await client.db("DT").collection("DT");





const router = Router();
router.use(express.json());

// Verb requests
router.get("/", async (req, res) => {
  const event_id = req.query.id;
  if (event_id !== undefined) {
    const o_id = new ObjectId(event_id);
    const result = await DT_Collection.findOne({
      _id: o_id
    })

    if (result !== null) return res.send(result);
    else return res.sendStatus(404);
  } else {
    const type = req.query.type;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const result = DT_Collection.find().sort({ _id: -1 }).limit(limit).skip(page);
    const results = await result.toArray();
    return res.send(results);
  }
});





router.post("/", (req, res) => {

});


router.put("/", (req, res) => {

});


router.delete("/", async (req, res) => {
  const event_id = req.query.id;
  if (event_id !== undefined) {
    const o_id = new ObjectId(event_id);
    const finder = await DT_Collection.findOne({
      _id: o_id
    });
    if (finder === null) return res.sendStatus(404);
    const deleteResult = await DT_Collection.deleteOne({ _id: o_id });
    console.dir(deleteResult.deletedCount);
    return res.send("Successfully Deleted!!");
  }
  return res.sendStatus(404);
});

export default router;
