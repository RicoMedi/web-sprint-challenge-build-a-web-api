const express = require('express');
const Projects = require('./projects-model');


const router = express.Router();

router.get('/', async (req,res, next) => {
    const projects= await Projects.get()
    try {
        res.status(200).json(projects)
    } catch (error) {
        next(error)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
      message: err.message,
      customMessage: "error within the projects router"
    });
  });

  module.exports = router;