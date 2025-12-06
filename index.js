require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: '*', 
  credentials: true
}));
app.use(express.json());

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express is running!');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API is now online on port ${PORT}`);
  });
}

module.exports = { app, mongoose };