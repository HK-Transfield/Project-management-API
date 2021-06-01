const Projects = require("../models/projects.model");

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


exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const projects = new Projects({
    id: req.body.id,
    projectname: req.body.projectname,
    projectdesc: req.body.projectdesc,
    startdate: req.body.startdate,
    enddate: req.body.enddate
  });

  
  Projects.create(projects, (err, newProject) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the appointment."
      });
    else 
      res.send(newProject);
  });
}

exports.getByID = (req, res) => {
  Projects.getByID(req.params.id, (err, project) => {
    if (err) 
      res.status(400).send(err);
    else {
      console.log("hi")
      res.json(project);
    }
  });
}

exports.getByProjectname = (req, res) => {
  console.log(req.params.projectname);
  Projects.getByProjectname(req.params.projectname, (err, project) => {
    if (err) 
      res.status(400).send({
        message: "Cannot not find project with project name: " + req.params.projectname,  
      });
    else {
      res.json(project);
    }
  });
}

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

exports.deleteAll = (req, res) => {
  Projects.deleteAll((err, project) => {
    if (err)
      res.send(error);
    else
      res.json({
        error: false,
        message: 'all projects successfully deleted'
      });
  });
}
