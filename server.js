const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const DATA_PATH = './data.json';

app.use(express.json());
app.use(express.static('public'));

app.get('/api/chats', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    res.header('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
  console.error('Erro ao ler arquivo:', err);
  res.status(500).json({ error: 'Erro interno ao ler arquivo' });
  }
});

app.post('/message', (req, res) => {
  const { chatId, text, from } = req.body;

  try{
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    const chat = data.chats.find(c => c.id === chatId);

    if (!chat) return res.status(404).json({ error: 'Chat não encontrado' });

    const msg = {
      text,
      from,
      time: new Date().toISOString
    };

    chat.messages.push(msg);
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

    res.json({ success: true, message: 'Mensagem adicionada' });
  } catch (err){
    console.error('Erro ao processar mensagem:', err);
    res.status(500).json({ error: 'Erro interno ao processar mensagem' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando http://localhost:${PORT}`));
