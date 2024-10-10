import express, { Request, Response } from 'express';

const app = express();
const port = 3000; // You can choose any port you like

// Middleware to parse JSON requests
app.use(express.json());

// Simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
