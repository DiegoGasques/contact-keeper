const express = require("express");
const connectDB = require("./config/db");

const app = express();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "Hello World " });
});

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
connectDB(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
