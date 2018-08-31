import express from 'express';
import dotenv from 'dotenv';
import router from './routes';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Welcome to home page"
  });
});

app.use('/api/v1', router);

app.use('*', (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "fail",
    message: err.message
  });
});


app.listen(port, () => console.log(`Running on port ${port}...`));
export default app;
