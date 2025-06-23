import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Example login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Dummy authentication logic
  if (username === "admin" && password === "password") {
    res.json({ success: true, token: "fake-jwt-token" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});