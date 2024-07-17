const express = require('express')
const app = express()
const port = 3000
const config = {
    host:'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) VALUES('Samay')`
connection.query(sql)
//connection.end()


app.get('/', (req, res) => {
    const select = `SELECT name FROM people`;

    connection.query(select, (error, results, fields) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            return res.status(500).send('Erro ao obter dados do banco de dados.');
        }

        const names = results.map(item => item.name);
        const htmlResponse = `
            <html>
            <head>
            <style>
                body {
                font-family: Arial, sans-serif;
                margin: 20px;
                }
                h1 {
                color: #333;
                }
                .names-container {
                margin-top: 20px;
                }
                .names-list {
                list-style-type: none;
                padding: 0;
                }
                .names-list li {
                margin-bottom: 8px;
                }
            </style>
            </head>
            <body>
            <h1>Full Cycle Rocks</h1>
            <div class="names-container">
                <p>Lista de nomes:</p>
                <ul class="names-list">
                ${names.map(name => `<li>${name}</li>`).join('')}
                </ul>
            </div>
            </body>
            </html>
        `;
        res.send(htmlResponse);
    
    });

})

app.listen(port, () => {
    console.log('Rodando na porta '+port)

})