import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Rota para validar e-mail único
app.post('/api/validar-email', async (req, res) => {
    const { email, apiKey, userKey } = req.body;
    const apiUrl = 'http://api.baselimpa.com/MailCheck.svc/rest/ValidarEmail';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, apiKey, userKey }),
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: 'Erro ao validar o e-mail' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Rota para validar lista de e-mails
app.post('/api/validar-emails', async (req, res) => {
    const { emails, apiKey, userKey } = req.body;
    const apiUrl = 'http://api.baselimpa.com/MailCheck.svc/rest/ValidarEmails';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emails, apiKey, userKey }),
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: 'Erro ao validar a lista de e-mails' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
