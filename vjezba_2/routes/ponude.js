import express from "express";
import { podaci_o_nekretninama } from "./nekretnine.js";
const router=express.Router();

let ponude=[];
let id_ponude=1;

router.post("/ponude/:id",(req,res)=>{
    let id_nekretnine=req.params.id;
    if(!id_nekretnine){
        return res.status(400).json({greska:"Nije unesen ID nekretnine"});
    }
    if (isNaN(id_nekretnine)){
        return res.status(400).json({greska:"ID mora biti broj"});
    }
    let pronaden_id=podaci_o_nekretninama.find(nekretnina=>nekretnina.id==id_nekretnine);
    if(!pronaden_id){
        return res.status(404).json({greska:"Ne postoji nekretnina sa tim ID-em"});
    }
    let ponuda=req.body;
    let kljucevi=Object.keys(ponuda);
    if(!(kljucevi.includes("id_nekretnine")&& kljucevi.includes("ime_kupca") && kljucevi.includes("prezime_kupca") && kljucevi.includes("cijena") && kljucevi.includes("telefon") && kljucevi.length==5)){
        return res.status(400).json({greska:"Nisi unio sve parametre ponude"});
    }
    if (ponuda.ponudena_cijena<0){
        return res.status(400).json({greska:"Cijena ne smije biti negativan broj"});
    }
    ponuda.id=id_ponude;
    id_ponude ++;
    ponude.push(ponuda);
    return res.status(201).json({poruka: "Ponuda uspješno zaprimljena"});
});

router.get("/ponude",(req,res)=>{
    return res.status(200).json(ponude);
})
export default router;