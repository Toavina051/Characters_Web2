// GET /characters ==> Get all characters
// POST /characters ==> Create a new character
// GET /characters/:id ==> Get a character by ID
// PUT /characters/:id ==> Update a character by ID
// DELETE /characters/:id ==> Delete a character by ID
//Faire un projet vite avec un tableau qui liste les nom de json
  
const { json } = require("body-parser");
const { error } = require("console");
const express = require("express")
const { request } = require("http");
const { writeFile } = require("node:fs");
const fs = require('node:fs/promises');


const app = express()

app.get("/characters", async (request, response) => {
    try {
        const data = await fs.readFile("./characters.json", { encoding: "utf8" });
        const parsedData = JSON.parse(data);
        response.json(parsedData);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/characters",async (request, response) => {
    try{
        const data = await fs.readFile("./characters.json", { encoding:"utf8" });
        const characters = JSON.parse(data);
        const characterId = parseInt(request.params.id);
        const ID = characters.characters.filter((character) => character.id == characterId)[0];
        if (!ID) {
            return response.json({error : "The ID dosn't exist"});
        }
        response.json(ID);
    }catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
})

app.post("/characters", async (request, response) => {
    try{
        const data = await fs.readFile("./characters.json", { encoding: "utf8" });
        const characters = JSON.parse(data);
        const newCharacter = request.body
        if (newCharacter == null) {
            return response.status(201).json({ error:"Please enter the new characters"})
        }
        else{
            characters.push(newCharacter);
            await fs.writeFile("./characters.json", JSON.stringify(characters, null, 2));
        } 
    }catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
})

app.put("/characters/:id", async (request, response) => {
    try{
        const data = await fs.readFile("./characters.json", { encoding:"utf8" });
        const characters = JSON.parse(data);
        const characterId = parseInt(request.params.id);
        const ID = characters.characters.filter((character) => character.id == characterId)[0];
        if (!ID) {
            return response.json({error : "The ID dosn't exist"});
        }
        const characterUpdate = request.body;
        if (characterUpdate == null) {
            return response.status(400).json({ error: "Character name is required" });
        }

        characters[ID] = { ...characters[ID], ...updatedCharacter, id: characterId };


        response.json(characters[ID]);
    }catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
})

app.delete("/characters/:id", async (request, response) => {
    try{
        const data = await fs.readFile("./characters.json", { encoding:"utf8" });
        const characters = JSON.parse(data);
        const characterId = parseInt(request.params.id);
        const ID = characters.characters.filter((character) => character.id == characterId)[0];
        characters.characters = ID;
        response.json(characters.characters);
    }catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(8080);