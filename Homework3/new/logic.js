const express = require('express'),
app = express(),
port = 5000,
bodyParser = require('body-parser'),
cors = require('cors');
path = require('path');
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), () => console.log('Server listening on port ' + port));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, "homepage.html"));
});
app.get('/stays', (req, res) => {
    const data = "data.json";
    res.send(data);
});