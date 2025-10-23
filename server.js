const express = require('express');
const app = express();
const cuentasController = require('./controllers/cuentas.controller'); 
const cuentasRoutes = require('./routes/cuentas.routes');

const PORT = 3130; 

app.use(express.json()); 

app.get('/', (req, res) => {
    res.send(`<h1>Servidor Backend del Examen II - Puerto ${PORT}</h1><p>API Funcionando.</p>`);
});

app.get('/cuentasBalance', cuentasController.getTotalBalance);
app.get('/cuenta/:id', cuentasController.getCuentaById);
app.use('/cuentas', cuentasRoutes);


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
    console.log(`Rutas listas: /cuentas, /cuenta/:id, /cuentasBalance`);
});