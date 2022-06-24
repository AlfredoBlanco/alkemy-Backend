const { Router } = require('express');
const Movies = require('../models/Movies');
const Characters = require('../models/Characters');
const Genre = require('../models/Genre');
const moment = require('moment');
const validate = require('../service');

const app = Router();

app.get('/', validate, async (req, res) => {
    try{

        const { name, genre, order } = req.query;
        let films = await Movies.findAll();
        
        if(name) films = films.filter(e => e.title.toLowerCase().includes(name.toLocaleLowerCase()));
        
        if(genre) films = films.filter(e => e.genreId === Number(genre));
        
        if(order) {

            switch(order) {
                case 'DESC' :
                    films.sort((a, b) => a.title.toLowerCase() > b.title.toLocaleLowerCase() 
                    ? -1 : 1);
                break;
                case 'ASC' :
                    films.sort((a, b) => a.title.toLowerCase() > b.title.toLocaleLowerCase()
                    ? 1 : -1);
                break;

            }
        }
        
        
        return res.json(films.map(e => ({id : e.id, title : e.title, image : e.image, date : e.date})));

    } catch(e){
        return res.json({msg : `There where problems ${e}`});
    }
})

app.post('/', validate, async (req, res) => {
    try{

        const { title, date, rate, image, characters, genres } = req.body;
        let finalRate = '';
        if(Number(rate) < 0 || Number(rate) > 5) return res.json({msg : 'Wrong data'});
        
        finalRate =  rate.indexOf('.') ? rate.slice(0,3) : rate;
        
        const checkDate = moment(date, 'YYYY-MM-DD', true).isValid();
        if( !checkDate ) return res.json({msg : 'Wrong date format, use YYYY-MM-DD'});
        
        const [film, check] = await Movies.findOrCreate({
            where : {title : title.trim()},
            defaults : {
                date, rate : finalRate, image
            }
        });
        if(!check) return res.json({msg : `The movie ${title} already exists`});
        
        if(typeof characters === 'object' ) await film.setCharacters(characters);

        if(typeof genres === 'object') await film.setGenre(genres.length === 1 ? genres : null);

        return res.json({msg : 'Movie added successfuly'});
    
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});
    }
})

app.get('/:id', validate, async (req, res) => {
    try{

        const { id } = req.params;

        const film = await Movies.findByPk(id, {
            include : {model : Characters , attributes : ['name']}
        });
        
        const genre = await Genre.findByPk(film.genreId);
        
        film.genreId = genre?.dataValues.name;
        return res.json(film);
    
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});
    }
})

app.put('/:id', validate, async (req, res) => {
    try{
        
        const { id } = req.params;
        const {characters, genres} = req.body;

        req.body.title ? req.body.title.trim() : '';
        
        let film = await Movies.findByPk(id);

        if(!film) return res.json({msg : 'No movie or series found'});

        if ( req.body.date ){
            const checkDate = moment(req.body.date, 'YYYY-MM-DD', true).isValid();
            if( !checkDate ) return res.json({msg : 'Wrong date format, use YYYY-MM-DD'});
        }

        film.set({
            ...req.body,
        })
        film = await film.save();

        if(typeof characters === 'object' ) await film.setCharacters(characters);

        if(typeof genres === 'object') await film.setGenre(genres.length === 1 ? genres : null);

        return res.json({msg : 'Movie updated successfully'});
    
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});
    }
})
app.delete('/:id', validate, async (req, res) => {
    try{

        const { id } = req.params;
        const deleted = await Movies.destroy({where : {id}});
        
        return res.json({msg : `${deleted ? 'Deleted succesfully' : 'There was an error'}`});
    
    
    } catch(e) {
        return res.json({msg : `There where problems ${e}`});
    }
})



module.exports = app;
