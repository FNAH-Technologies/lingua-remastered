import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/lessons", (req, res) => {
  res.json([
    { id: 1, title: "Lesson 1", content: "Hello World" },
    { id: 2, title: "Lesson 2", content: "Microservices are cool!" }
  ]);
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Lesson service running on port ${PORT}`);
});