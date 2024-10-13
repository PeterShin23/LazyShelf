import express from 'express';

const router = express.Router();

// Define API routes
router.get('/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

export default router;