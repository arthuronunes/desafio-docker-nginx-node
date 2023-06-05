const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodenginxdb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);
var count = 1;

function asynqQuery(query, params) {
    return new Promise((resolve, reject) =>{
        connection.query(query, params, (err, result) => {
            if (err)
                return reject(err);
            resolve(result);
        });
    });

}

const createTable = async () => {
    const sql = 'CREATE TABLE IF NOT EXISTS people (id MEDIUMINT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY (id));'
    await asynqQuery(sql);
    console.log('criando tabela');
}

const createNew = async () => {
    const sql = 'INSERT INTO people SET ?';
    const rr = await asynqQuery(sql, {name: 'Registro'});
    count++;
    console.log('Inserindo', rr.insertId)
}

const getAll = async () => {
    var result = await asynqQuery('SELECT * FROM people');
    console.log(`Consultando ${result.length} registros`);
    return result;
}

const formatResponse = (result) => {
    var resp = '<h1>Full Cycle</h1>';
    resp += '<ul>';
    result.forEach(i => {
        resp += `<li> ${i.id + "-" + i.name} </li>`;
    })
    resp += '</ul>';
    return resp;
}

app.get('/healthcheck', async (req, res) => {
    var result = await asynqQuery('SELECT * FROM people');
    console.log('health check OK')
    res.send('<h1>OK</h1>');
})

app.get('/', async (req, res) => {
    await createNew();
    const result = await getAll();
    const response = formatResponse(result);
    res.send(response);
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
    createTable();
})