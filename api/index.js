const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

const dbURI = "mongodb+srv://dao:dao@cluster0.99uhnut.mongodb.net/?retryWrites=true&w=majority" ;


mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const amountSchema = new mongoose.Schema({
  user: String,
  amount: mongoose.Schema.Types.Decimal128, // Use Decimal128 for monetary amounts
});

const UserInvestment = mongoose.model('UserInvestment', amountSchema);




app.post('/update', async(req, res) => {
  const { user, amount } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await UserInvestment.findOne({ user });

    if (existingUser) {
      // If the user exists, update their amount by adding the value from req.body
      const existingAmount = parseFloat(existingUser.amount.toString());
      const newAmount = existingAmount + parseFloat(amount);
      existingUser.amount = mongoose.Types.Decimal128.fromString(newAmount.toString());
      await existingUser.save();
    } else {
      // If the user doesn't exist, create a new entry with the provided user and amount
      const newUserInvestment = new UserInvestment({ user, amount });
      await newUserInvestment.save();
    }

    res.json({ message: 'Value updated successfully!' });
  } catch (error) {
    console.error('Error updating user investment:', error);
    res.status(500).json({ error: 'Error updating user investment' });
  }
});

app.get('/getAmount/:user', async (req, res) => {
  const { user } = req.params;

  try {
    // Check if the user exists in the database
    const existingUser = await UserInvestment.findOne({ user });

    if (existingUser) {
      res.json({ amount: existingUser.amount.toString() });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user amount:', error);
    res.status(500).json({ error: 'Error retrieving user amount' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


