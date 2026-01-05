import app from "./src/App.js";
import config from "./src/config/config.js";
import mongoose from "mongoose";

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`App is running at PORT ${PORT}`);
});

(async (req, res) => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("successfully connected to mongodb");
  } catch (error) {
    console.log(`Error in db connection ${error}`);
    res.status(500).json({
      success: false,
      message: `Error in db connection ${error}`,
      error,
    });
  }
})();
