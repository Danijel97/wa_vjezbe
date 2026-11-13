import express from "express";
const router=express.Router();
let sljedeci_id=8;

export const podaci_o_nekretninama=[
    {
        id: 1,
        naziv: "Stan u centru",
        opis: "Dvosoban stan u centru grada",
        cijena: 120000,
        lokacija: "Zagreb",
        broj_soba: 2,
        povrsina: 65
    },
    {
        id: 2,
        naziv: "Obiteljska kuća",
        opis: "Prostrana kuća s dvorištem",
        cijena: 250000,
        lokacija: "Rijeka",
        broj_soba: 5,
        povrsina: 180
    },
    {
        id: 3,
        naziv: "Apartman uz more",
        opis: "Apartman s pogledom na more",
        cijena: 180000,
        lokacija: "Zadar",
        broj_soba: 3,
        povrsina: 85
    },
    {
        id: 4,
        naziv: "Garsonijera",
        opis: "Mala garsonijera za jednu osobu",
        cijena: 75000,
        lokacija: "Osijek",
        broj_soba: 1,
        povrsina: 32
    },
    {
        id: 5,
        naziv: "Vila s bazenom",
        opis: "Moderna vila s privatnim bazenom",
        cijena: 550000,
        lokacija: "Split",
        broj_soba: 6,
        povrsina: 250
    },
    {
        id: 6,
        naziv: "Stan u novogradnji",
        opis: "Trosoban stan s balkonom",
        cijena: 195000,
        lokacija: "Pula",
        broj_soba: 3,
        povrsina: 90
    },
    {
        id: 7,
        naziv: "Kuća na selu",
        opis: "Obiteljska kuća s velikim vrtom",
        cijena: 95000,
        lokacija: "Otočac",
        broj_soba: 4,
        povrsina: 140
    }
];

router.get("/nekretnine", (req,res)=>{
    return res.status(200).json(podaci_o_nekretninama);
});
router.get("/nekretnine/:id",(req,res)=>{
    let id_nekretnine=req.params.id;
    if (isNaN(id_nekretnine)){
        return res.status(400).json({greska:"Unesite broj za ID nekretnine"})
    }
    let trazeni_id=podaci_o_nekretninama.find(nekretnina=>nekretnina.id==id_nekretnine);
    if(trazeni_id){
        return res.status(200).json(trazeni_id);
    }
    return res.status(404).json({poruka:"Ne postoji nekretnina s ID-em kojeg si napisao"})
});

router.post("/nekretnine",(req,res)=>{
    let nova_nekretnina=req.body;
    let kljucevi=Object.keys(nova_nekretnina);
    if(!(kljucevi.includes('naziv') && kljucevi.includes('opis') && kljucevi.includes('cijena') && kljucevi.includes('lokacija') && kljucevi.includes('broj_soba') && kljucevi.includes('povrsina') && kljucevi.length==6)){
        return res.status(400).json({greska:"Nisi ispravno unio kljuceve"});
    }
    if(isNaN(nova_nekretnina.cijena) || nova_nekretnina.cijena<1){
        return res.status(400).json({greska:"Nisi dobro unio cijenu nekretnine"});
    }
    if(isNaN(nova_nekretnina.povrsina) || nova_nekretnina.povrsina<1){
        return res.status(400).json({greska:"Nisi dobro unio površinu nekretnine"});
    }
    if(isNaN(nova_nekretnina.broj_soba) || nova_nekretnina.broj_soba<0){
        return res.status(400).json({greska:"Nisi dobro unio broj soba"});
    }
    nova_nekretnina.id=sljedeci_id;
    podaci_o_nekretninama.push(nova_nekretnina)
    sljedeci_id ++;
    return res.status(201).json({poruka:"Uspješno dodana nova nekretnina"});


})

router.put("/nekretnine/:id",(req,res)=>{
    let id_za_promjenu=req.params.id;
    let nekretnina_za_promjenu=podaci_o_nekretninama.find(nekretnina=>nekretnina.id==id_za_promjenu);
    if (!nekretnina_za_promjenu || isNaN(id_za_promjenu)){
        return res.status(400).json({greska:"Ne postoji nekretnina sa navedenim ID-jem"});
    }
    let izmjena=req.body;
    let kljucevi=Object.keys(izmjena);
    if(!(kljucevi.includes('naziv') && kljucevi.includes('opis') && kljucevi.includes('cijena') && kljucevi.includes('lokacija') && kljucevi.includes('broj_soba') && kljucevi.includes('povrsina') && kljucevi.length==6)){
        return res.status(400).json({greska:"Nisi ispravno unio kljuceve"});
    }
    if(isNaN(izmjena.cijena) || izmjena.cijena<1){
        return res.status(400).json({greska:"Nisi dobro unio cijenu nekretnine"});
    }
    if(isNaN(izmjena.povrsina) || izmjena.povrsina<1){
        return res.status(400).json({greska:"Nisi dobro unio površinu nekretnine"});
    }
    if(isNaN(izmjena.broj_soba) || izmjena.broj_soba<0){
        return res.status(400).json({greska:"Nisi dobro unio broj soba"});
    }
    let indeks_zamjene=podaci_o_nekretninama.findIndex(nekretnina=>nekretnina.id==id_za_promjenu);
    izmjena.id=Number(id_za_promjenu);
    podaci_o_nekretninama.splice(indeks_zamjene,1,izmjena);
    return res.status(200).json({poruka: "Nekretnina je uspješno ažurirana"});

}
)

router.patch("/nekretnine/:id",(req,res)=>{
    let id_za_promjenu=req.params.id;
    let nekretnina_za_promjenu=podaci_o_nekretninama.find(nekretnina=>nekretnina.id==id_za_promjenu);
    if (isNaN(id_za_promjenu)) {
    return res.status(400).json({greska:"ID mora biti broj"});
}

if (!nekretnina_za_promjenu) {
    return res.status(404).json({greska:"Nekretnina ne postoji"});
}
    let azuriranje=req.body;
    let kljucevi=Object.keys(azuriranje);
  if(kljucevi.includes("cijena")){  
    if(isNaN(azuriranje.cijena)){
        return res.status(400).json({greska:"Nisi dobro unio cijenu nekretnine"});
    }
    if(azuriranje.cijena<1){
        return res.status(400).json({greska:"Nisi dobro unio cijenu nekretnine"});
    }}
    if(kljucevi.includes("povrsina")){
    if(isNaN(azuriranje.povrsina) || azuriranje.povrsina<1 ){
        return res.status(400).json({greska:"Nisi dobro unio površinu nekretnine"});
    }
    }

    if(kljucevi.includes("broj_soba")){
    if(isNaN(azuriranje.broj_soba)){
        return res.status(400).json({greska:"Nisi dobro unio broj soba"});

}}
if(azuriranje.broj_soba<0){
    return res.status(400).json({greska:"Nisi dobro unio broj soba"});
}
let kljucevi_izmjene=Object.keys(azuriranje);
let dozvoljeni_kljucevi = ['naziv', 'opis', 'cijena', 'lokacija', 'broj_soba', 'povrsina'];
for (const kljuc of kljucevi) {
    if(!dozvoljeni_kljucevi.includes(kljuc)){
        return res.status(400).json({greska: "Nisi ispravno unio kljuceve"});
    }
}
if(kljucevi_izmjene.length==0){
    return res.status(400).json({greska:"Nisi poslao podatke za ažuriranje"});
}
for (const kljuc of kljucevi_izmjene) {
    nekretnina_za_promjenu[kljuc]=azuriranje[kljuc];
}
return res.status(200).json({poruka:"Uspješno ažurirana nekretnina"})});

router.delete("/nekretnine/:id",(req,res)=>{
    let id_nekretnine=req.params.id;
    if(isNaN(id_nekretnine)){
        return res.status(400).json({Greska:"ID nekretnine mora biti broj"});
    }

    if (!id_nekretnine){
        return res.status(404).json({Greska:"Nije upisan ID nekretnine!"});
    }
    let index_brisanja=podaci_o_nekretninama.findIndex(nekretnina=>nekretnina.id==id_nekretnine);
    if(index_brisanja==-1){
        return res.status(400).json({greska:"Ne postoji upisani ID nekretnine"})
    }
  
    podaci_o_nekretninama.splice(index_brisanja,1);
    return res.status(200).json({poruka: "Nekretnina uspješno obrisana"});
})

export default router;