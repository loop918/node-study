const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const  cors = require('cors');
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 3060;

//cors 설정
const corsOption = {
    origin : 'http://localhost:3000',
    credentials : true
}
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});




