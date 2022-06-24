const { Router } = require('express');
const Characters = require('../models/Characters');
const Movies = require('../models/Movies');
const validate = require('../service');

const app = Router();

app.get('/', validate, async (req, res) => {
    try{

        const { name, age, movies, weight } = req.query;
        let chars = await Characters.findAll({include : { model : Movies, attributes: ['id','title']}});
        
        if (name) {
           chars = chars.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        }
        
        if (age) {
            chars = chars.filter(e => Number(e.age) === Number(age));
        } else if (movies) {
            chars = chars.filter(e => e.movies.find(e => Number(e.id) === Number(movies)));
        } else if (weight) {
            chars = chars.filter(e => Number(e.weight) === Number(weight));
        }
        return res.json(chars.map(e => ({id : e.id, name : e.name, image : e.image})));

    } catch(e) {
        return res.json({msg : `There where problems ${e}`});

    }
})

app.post('/', validate, async (req, res) => {
    try {
        const { image, name, age, 
            weight, history, movies} = req.body;
        
        
        const [character, check] = await Characters.findOrCreate({
            where : {name : name.toLowerCase()},
            defaults : {
                image, age, weight, history
            }
        })
        if(!check) return res.json({msg : `Character ${name} already exists`});

        await character.setMovies(movies);

        return res.json({msg : 'Character created successfully'});

    } catch (e) {
        return res.json({msg : `There where problems ${e}`});
    }
})

app.get('/:id', validate, async (req, res) => {
    try{

        const { id } = req.params;
        
        const character = await Characters.findOne({
            where : {id},
            include : { model : Movies, attributes: ['title']}
        })

        return res.json(character);

    } catch(e) {
        return res.json({msg : `There where problems ${e}`});
    }
})

app.put('/:id', validate, async (req, res) => {
    try{

        const { id } = req.params;
        const { movies, name } = req.body;
        
        if (name) req.body.name = req.body.name.toLowerCase();

        let character = await Characters.findOne({
            where : {id}
        })
        
        if (!character) return res.json({msg : 'No character found'});
        
        character.set({
            ...req.body
        })
        character = await character.save();

        if(movies) await character.setMovies(movies);

        return res.json({msg : `Character updated successfully`});

    } catch(e){
        return res.json({msg : `There where problems ${e}`});

    }
})

app.delete('/:id', validate, async (req, res) => {
    try {

        const { id } = req.params;
        const deleted = await Characters.destroy({where : {id}});
        
        return res.json({msg : `${deleted ? 'Deleted succesfully' : 'There was an error'}`});
    
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});

    }
})

module.exports = app;
