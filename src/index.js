const express = require("express");
const cors = require("cors");
const { statistics } = require("./constants");

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cors());

app.get("/findByPin", (req, res) => {
  try {

    const pincode = req.query.pincode;
    const date = req.query.date;

     if (!pincode || !date) {
      return res
        .status(400)
        .send({ error: "Both pincode and date are required parameters." });
    }

    const shuffled = [...statistics].sort(() => 0.5 - Math.random()); 
    const slotList = shuffled.slice(0, 6).map((s) => ({
      ...s,
      pincode: pincode,
    }));

    const responseData = {
      statistics: slotList,
    };
   
    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({ message: "An error occurred", error });
  }
});

app.get("/", (req, res) => {
  console.log("API V1");
  res.send("API V1");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
