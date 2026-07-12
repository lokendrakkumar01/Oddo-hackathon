const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Asset = require('./model/assest');

main()
  .then(() => {
    console.log('mongo connected');
  })
  .catch(err => {
    console.log(err);
  });
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/assesflow');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/assets', async (req, res) => {
  try {
    const assets = await Asset.find();
    res.render('assets/index', { assets });
  } catch (err) {
    console.log(err);
    res.render('assets/index', { assets: [] });
  }
});

app.get('/assets/new', (req, res) => {
  res.render('assets/new');
});

app.get('/assets/:id', async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.send('Asset not found');
    res.render('assets/show', { asset });
  } catch (err) {
    console.log(err);
    res.send('Asset not found');
  }
});

app.get('/assets/:id/edit', async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.send('Asset not found');
    res.render('assets/edit', { asset });
  } catch (err) {
    console.log(err);
    res.send('Asset not found');
  }
});
app.get('/departments', (req, res) => {
  res.render('departments/index');
});
app.get('/employees', (req, res) => {
  res.render('employees/index');
});

app.get('/', (req, res) => {
  res.send('Home');
});

app.listen(8080, () => {
  console.log('Listening to 8080');
});
