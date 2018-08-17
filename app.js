import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/api/v1', (req, res) => {
    res.status(200).json ({
        status: "success",
       message: 'Welcome to home page'
    });
});

app.use('/api/v1', router);

app.use('*', (err,req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json ({
        status: "fail",
       message: err.message
    });
});


app.listen(port);
console.log(`Running on port ${port}...`);

export default app;
