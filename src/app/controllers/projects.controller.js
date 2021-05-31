const Projects = require("../models/projects.model");

exports.getAll = (req, res) => {
    Projects.getAll((err, project) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Something error occurred while retrieving projects."
        });
      else 
        res.send(project);
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
  
    
    Projects.create(projects, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the appointment."
        });
      else res.send(data);
    });
  };
 
//TODO complete the code as per the instructions given in assignment four
