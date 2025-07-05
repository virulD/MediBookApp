const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Replace with your MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://myclinicuser:welcome!23@myclinic-cluster.ht5hi.mongodb.net/?retryWrites=true&w=majority&appName=myclinic-cluster';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const bookingSchema = new mongoose.Schema({
  id: String,
  patientName: String,
  doctorId: String,
  dispensaryId: String,
  date: String,
  time: String,
  reason: String,
  status: String,
  phone: String,
  email: String,
  createdAt: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

app.post('/api/appointments', async (req, res) => {
  try {
    console.log('Received booking request:', req.body);
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    console.log('Booking saved successfully:', savedBooking);
    res.status(201).json({ message: 'Booking saved!', booking: savedBooking });
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ error: 'Failed to save booking', details: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 