
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const groupRoutes = require('./routes/groups');
const jobRoutes = require('./routes/jobs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/groups', groupRoutes);
app.use('/api/jobs', jobRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Job Portal API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
