const express = require('express');
const Projects = require('./projects-model');
const { validateId, validateBody} = require('./projects-middleware')

const router = express.Router();

router.get('/', async (req,res, next) => {
    const projects= await Projects.get()
    try {
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateId, (req, res)=> {
    res.json(req.project)
})

router.post('/', validateBody, (req, res, next)=>{
    Projects.insert(req.body)
    .then((newProject)=>{
        res.json(newProject);
    }).catch(next)
})

router.put('/:id', validateId, validateBody,(req, res, next) =>{
    Projects.update(req.params.id, req.body)
    .then((changes)=>{
        res.status(200).json(changes)
    }).catch(next)
    
})

router.delete('/:id', validateId,(req,res, next)=>{
    Projects.remove(req.params.id)
    .then((removed)=>{
        res.status(200).json(removed);
    }).catch(next)
})

router.get('/:id/actions', validateId,(req, res, next)=>{
    Projects.getProjectActions(req.params.id)
    .then((moves)=>{
        res.status(200).json(moves)
    }).catch(next);
})


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
      message: err.message,
      customMessage: "error within the projects router"
    });
  });



  module.exports = router;