// add middlewares here related to actions
const Action = require('./actions-model');

async function validateActionId(req, res, next) {
    try {
        const actId = await Action.get(req.params.id);

        if (!actId) {
            res.status(404).json({
                message: 'Action does not exist',
            });
        } else {
            req.actId = actId; 
            next();
        }
    } catch (error) {
        res.status(500).json({
            message: 'Problem finding action',
        });
    }
}

function validateActionsBody(req, res, next){
    const { notes, description } = req.body;
    if (
        notes !== undefined &&
        typeof notes === "string" &&
        notes.length &&
        notes.trim().length &&
        description !== undefined &&
        description.length &&
        description.trim().length
    ) {
        next();
    } else {
        res.status(400).json({
            message: 'Required fields are missing'
        });
    }
}

function validateProjectParent(req, res, next){
    const{projectId} = req.body
    .then
}

module.exports={
    validateActionId,
    validateActionsBody,
    validateProjectParent,
}