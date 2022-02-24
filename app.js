const express = require('express');
const app = express();
const auth = require('./routes/cauth');

app.use(express.json());





app.use('/auth/api', auth);


app.listen(4000, function(req, res) {
        
    console.log('Server running');

});

