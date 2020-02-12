const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const activityModel = require('./models/activityModel');
const activityApiRouter = require('./routes/api/activityApiRouter')(activityModel);

const app = express();
const port = 3000;
const db = mongoose.connect('mongodb://localhost/activityAPI');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(activityApiRouter);

app.get('/', (req, res) => res.send('This is the index page'));
app.listen(port, () => console.log(`App running on port ${port}`));
