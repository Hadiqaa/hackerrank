const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // You can include body-parser here if you need it
const app = express();
const port = 3002;
const middleware = require('./middleware');

const recipesRoute = require('./routes/recipes')



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(middleware);


app.use('/', recipesRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


module.exports = app;