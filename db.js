const express = require('express');
const bodyParser = require('body-parser');
const { Book } = require('./database'); 

const app = express();
app.use(bodyParser.json());


app.get('/ebooks', async (req, res) => {
  try {
    const ebooks = await Book.find();
    res.json(ebooks);
  } catch (err) {
    res.status(500).send('Error fetching eBooks');
  }
});

app.get('/ebooks/:id', async (req, res) => {
  try {
    const ebook = await Book.findById(req.params.id);
    if (!ebook) {
      return res.status(404).send('EBook not found');
    }
    res.json(ebook);
  } catch (err) {
    res.status(500).send('Error fetching eBook');
  }
});


app.post('/ebooks', async (req, res) => {
  const { title, author, format } = req.body;
  try {
    const newEbook = await Book.create({ title, author, format });
    res.status(201).json(newEbook);
  } catch (err) {
    res.status(500).send('Error creating eBook');
  }
});


app.put('/ebooks/:id', async (req, res) => {
  const { title, author, format } = req.body;
  try {
    const updatedEbook = await Book.findByIdAndUpdate(req.params.id, { title, author, format }, { new: true });
    if (!updatedEbook) {
      return res.status(404).send('EBook not found');
    }
    res.json(updatedEbook);
  } catch (err) {
    res.status(500).send('Error updating eBook');
  }
});


app.delete('/ebooks/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send('Error deleting eBook');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});