const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// body parser middleware
app.use(express.json());

//routes
app.use('/', require('./routes/routes'));

const PORT = 8080;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
