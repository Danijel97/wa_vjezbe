import express from "express";
const app=express();
const port=3000;
app.use(express.json());

app.listen(port,error=>{
    if (error){
        console.log("Greška pri pokretanju poslužitelja")
    }
    console.log(`Poslužitelj radi na portu ${port}`);
});

import ponude_router from "./routes/ponude.js";
import nekretnine_router from "./routes/nekretnine.js";
app.use(nekretnine_router);
app.use(ponude_router);


