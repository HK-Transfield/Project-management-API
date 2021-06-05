// https://stackoverflow.com/questions/49564925/restful-api-node-js-express-error-status-response-empty-array
// https://www.google.com/search?q=express+handle+empty+array+response&rlz=1C1JZAP_enNZ681NZ681&oq=express+handle+empty+array+response&aqs=chrome..69i57j35i39.10364j0j4&sourceid=chrome&ie=UTF-8
const Projects = require("../models/projects.model");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getAll = (req, res) => {
    Projects.getAll((err, project) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Something error occurred while retrieving projects."
        });
      else 
        res.json(project);
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } 

  // create a new project object from the request body
  const projects = new Projects({
    projectname: req.body.projectname,
    projectdesc: req.body.projectdesc,
    startdate: req.body.startdate,
    enddate: req.body.enddate
  });

  
  Projects.create(projects, (err, newProject) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the project."
      });
    else 
      res.send(newProject);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 exports.getByProjectname = (req, res) => {
  Projects.getByProjectname(req.query.projectname, (err, project) => {
    if (err) 
      res.status(500).json(err);
    else {
      if (!project || !project.length)
        res.status(404).json({
          message: "Cannot not find project with project name: " + req.query.projectname,  
        });
      else
        res.json(project);
    }
  });
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getByID = (req, res) => {
  Projects.getByID(req.params.id, (err, project) => {
    if (err) 
      res.status(500).json(err);
    else {
      if (!project || !project.length)
        res.status(404).json({
          message: "Cannot not find project with project id: " + req.params.id,  
        });
      else
        res.json(project);
    }
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateByID = (req, res) => {
  Projects.updateByID(req.params.id, new Projects(req.body), (err, project) => {
    if (err) 
      res.status(400).send({
        message: "Cannot not find project at id: " + req.params.id,  
      });
    else
      res.json(project);
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteByID = (req, res) => {
  Projects.deleteByID(req.params.id, (err, project) => {
    if (err)
      res.send(error);
    else
      res.json({
        error: false,
        message: 'project successfully deleted'
      });
  });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteAll = (req, res) => {
  Projects.deleteAll((err, project) => {
    if (err)
      res.json(error);
    else
      res.json({
        error: false,
        message: 'all projects successfully deleted'
      });
  });
}
