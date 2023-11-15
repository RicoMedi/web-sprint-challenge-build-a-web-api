// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { validateActionId, validateActionsBody, validateProjectParent } = require('./actions-middlware')
const router = express.Router();

router.get("/", async (req, res, next) => {
  const action = await Actions.get();
  try {
    res.status(200).json(action);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateActionId, (req, res)=>{
    res.json(req.actId);
})

router.post('/', validateActionsBody, validateProjectParent, (req,res,next)=>{
    Actions.insert(req.body)
    .then((newActions)=>{
        res.status(201).json(newActions)
    }).catch(next)
})

router.use((err, req, res, next) => {// eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "something very bad happened",
  });
});

module.exports = router;
