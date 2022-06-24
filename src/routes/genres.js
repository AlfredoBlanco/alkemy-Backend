const { Router } = require('express');
const Genres = require('../models/Genre');
const validate = require('../service');

const app = Router();

app.get('/', validate, async (req, res) => {
    try{

        const genres = await Genres.findAll();
        return res.json(genres);

    } catch(e) {
        return res.json({msg : `There where problems ${e}`});

    }
})

app.post('/', validate, async (req, res) => {
    try{

        const { name, image } = req.body;
        
        const [genre, check] = await Genres.findOrCreate({
            where : { name : name.toUpperCase() },
            defaults : { image }
        });
        
        if(!check) return res.json({msg : `Genre ${name} already exists`});
        
        return res.json({msg : 'Genre created successfully'});

    } catch(e) {
        return res.json({msg : `There where problems ${e}`});

    }
})

app.put('/:id', validate, async (req, res) => {
    try{

        const { id } = req.params;

        if( req.body.name ) req.body.name = req.body.name.toUpperCase();

        let genre = await Genres.findOne({
            where : {id}
        })
        
        if (!genre) return res.json({msg : 'No genre found'});
        
        genre.set({
            ...req.body
        })
        genre = await genre.save();
        
        return res.json({msg : 'Genre updated correctly'})
     
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});

    }
})

app.delete('/:id', validate, async (req, res) => {
    try{

        const { id } = req.params;
        const deleted = await Genres.destroy({where : {id}});
        
        return res.json({msg : `${deleted ? 'Deleted succesfully' : 'There was an error'}`});
        
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});

    }

})

module.exports = app;