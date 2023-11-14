const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


let ebooks = [
  { id: 1, title: 'Book 1', author: 'Author 1', format: 'PDF' },
  { id: 2, title: 'Book 2', author: 'Author 2', format: 'EPUB' }
];

app.get('/ebooks', (req, res) => {
  res.json(ebooks);
});


app.get('/ebooks/:id', (req, res) => {
  const ebookId = parseInt(req.params.id);
  const ebook = ebooks.find(ebook => ebook.id === ebookId);

  if (!ebook) {
    return res.status(404).send('EBook not found');
  }

  res.json(ebook);
});


app.post('/ebooks', (req, res) => {
  const { title, author, format } = req.body;
  const newEbook = { id: ebooks.length + 1, title, author, format };
  ebooks.push(newEbook);

  res.status(201).json(newEbook);
});


app.put('/ebooks/:id', (req, res) => {
  const ebookId = parseInt(req.params.id);
  const { title, author, format } = req.body;
  const ebookIndex = ebooks.findIndex(ebook => ebook.id === ebookId);

  if (ebookIndex === -1) {
    return res.status(404).send('EBook not found');
  }

  const updatedEbook = { id: ebookId, title, author, format };
  ebooks[ebookIndex] = updatedEbook;

  res.json(updatedEbook);
});


app.delete('/ebooks/:id', (req, res) => {
  const ebookId = parseInt(req.params.id);
  ebooks = ebooks.filter(ebook => ebook.id !== ebookId);

  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});