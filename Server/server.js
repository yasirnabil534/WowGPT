const mongoose = require("mongoose");
const app = require("./src/app/app");
const port = 3000;
require("dotenv").config();

app.get("/", (req, res) => {
  try {
    res.status(200).json({ mesage: "Connections are established" });
  } catch (err) {
    res.status(500).json({ mesage: "Connections are not established" });
  }
});

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.DB_URI);
      console.log('Connected to DB server');
  } catch (err) {
      console.log(`DB error for error ${err}`);
      throw err;
  }
};

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is listening on port ${port}`);
  } catch (err) {
    console.log("Server cannot be connected because of the error:");
    console.log(err);
  }
});
