const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const arduinoRouter = require('./app/routes/route')

const app = express();

let corsOptions = {
    origin: "http://localhost:3001",
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

//Parse request of content-type is "application/json"
app.use(express.json());

// Parse request of content-type is "application/x-www-form-urlencoded"
app.use(express.urlencoded({ extended: true}));

// lets setting up the database sync and connection
db.sequelize.sync()
.then(() => {
    console.log("Database is Synced");
})
.catch((err) => {
    console.log("Failed to sync the db: "+ err.message);
});

// all routes
app.use(arduinoRouter);

// set port, listen for request
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});