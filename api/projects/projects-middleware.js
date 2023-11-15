// add middlewares here related to projects
const Project = require("./projects-model");

async function validateId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Project not found",
      });
    } else {
      (req.project = project), next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Problem finding project",
    });
  }
}
function validateBody(req, res, next) {
    const { name, description, completed } = req.body;
    if (
        name !== undefined &&
        typeof name === "string" &&
        name.length &&
        name.trim().length &&
        description !== undefined &&
        description.length &&
        description.trim().length &&
        completed !== undefined
    ) {
        next();
    } else {
        res.status(400).json({
            message: 'Required fields are missing'
        });
    }
}


module.exports = {
  validateId,
  validateBody,
};
