const express = require("express");
const app = express();
const fs = require("fs");
const {json} = require("express");
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());


app.listen(5000,function (){console.log("Servidor lanzado en el puerto 5000")});

app.post("/",(req,res) =>{
    console.log(req.body)
    let lista = req.body;
    fs.writeFile("./data.txt", JSON.stringify(lista),(err)=>{
        if (err) throw err;
    });

    res.send("Tareas subidas correctamente");
})

let fileContent = function (){
    return new Promise((resolve, reject) => {
        fs.readFile("./data.txt",(err, data)=>{
            if (err) reject(err);
            else resolve(data);
        })
    })
}
app.get("/api/download", async (req,res) =>{
    let lista = await fileContent();
    res.send(lista);
});
