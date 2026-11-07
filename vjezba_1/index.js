const express = require('express');
const app = express();

const PORT = 3000;

const korisnici=[
    {id:1, ime:"Ana", prezime:"Anić"},
    {id:2, ime:"Marko", prezime:"Marić"},
    {id:3, ime:"Pero", prezime:"Perić"}
];

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/html1.html');
});

app.get('/about',(req, res) => {
    res.sendFile(__dirname +'/public/html2.html');
});

app.get('/users',(req, res) => {
    res.json(korisnici);
});

app.listen(PORT, () => {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
});