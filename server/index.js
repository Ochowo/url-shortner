// const express = require('express');
const express = require('express');
const path = require('path');
const user = require('./controller/userController');
const url = require('./controller/urlController');

const PORT = process.env.PORT || 3001;
const app = express();
// const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});
app.post('/api/signup', user.signup);
app.post('/api/login', user.signin);
app.post('/api/url', url.createUrl);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
