const mongoose = require('mongoose');
require("dotenv").config()

const app = require("./app")
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    })
    
  } catch (error) {
    console.log(error)
  }
}

start()