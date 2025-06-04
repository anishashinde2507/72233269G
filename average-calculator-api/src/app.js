const express = require("express");
const cors = require("cors");
const averageRouter = require("./routes/average");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/average", averageRouter);

const PORT = process.env.PORT || 9876;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
