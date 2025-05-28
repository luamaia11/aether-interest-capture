const express = require('express');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/send', async (req: any, res: any) => {
  const { nomeCompleto, especialidade, telefone, pacientesMes, email } = req.body;

  if (!nomeCompleto || !especialidade || !telefone || !pacientesMes || !email) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    await client.query(
      `INSERT INTO leads (nome_completo, especialidade, telefone, pacientes_mes, email)
       VALUES ($1, $2, $3, $4, $5)`,
      [nomeCompleto, especialidade, telefone, pacientesMes, email]
    );
    await client.end();

    res.status(200).json({ message: 'Lead armazenado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao salvar no banco' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
