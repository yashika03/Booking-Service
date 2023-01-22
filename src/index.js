const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const apiRoutes = require('./routes/index');
const {PORT} = require('./config/serverConfig');
const db = require('./models/index');


const ServerSetup = async() =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',apiRoutes);
    
    app.listen(PORT, () => {
        console.log(`Server Started at PORT: ${PORT}`);
        if(process.env.DB_SYNC=="true")
        {
            db.sequelize.sync({alter: true});
        }
    });
    
}

ServerSetup();