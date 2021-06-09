/*****************************************************************
 * Definitions for the generic callback functions that that are 
 * passed to each route.
 * 
 * @author Harmon Transfield
 * @description Created for assignment 4, COMPX322-21A
 *****************************************************************/

const Projects = require("../models/projects.model");

// displays list of all projects as JSON on GET
exports.getAll = (req, res) => {
    Projects.getAll((err, projects) => {
      if (err) // something went wrong with the server or database
        res.status(500).json({
          message:
            err.message || "Something error occurred while retrieving projects."
        });
      else 
        res.json(projects);
    });
}

// handles a new project created on POST
exports.create = (req, res) => {
  if (Object.keys(req.body).length === 0)  // check that the request body is not empty
    res.status(400).json({
      message: "Content can not be empty!"
    });
  else {

    // create new project to send to the database
    Projects.create(new Projects(req.body), (err, newProject) => {
      if (err)
        res.status(500).json({
          message:
            err.message || "Some error occurred while creating the project."
        });
      else 
        res.json(newProject);
    });
  }
}

// displays specific project by name on GET
exports.getByProjectname = (req, res) => {
  Projects.getByProjectname(req.query.projectname, (err, projects) => {
    if (err) // something went wrong with the server or database
      res.status(500).json(err);
    else {
      if (!projects || !projects.length) // check that the project is not empty
        res.status(404).json({
          message: "Cannot not find project with project name: " + req.query.projectname,  
        });
      else
        res.json(projects);
    }
  });
}

// display specific project by ID on GET
exports.getByID = (req, res) => {
  Projects.getByID(req.params.id, (err, project) => {
    if (err) 
      res.status(500).json(err);
    else {
      if (!project || !project.length) // database sent back empty results
        res.status(404).json({
          message: "Cannot not find project with project id: " + req.params.id,  
        });
      else
        res.json(project);
    }
  });
}

// handles project update on PUT
exports.updateByID = (req, res) => {
  if (Object.keys(req.body).length === 0)  // check that the request body is not empty
      res.status(404).json({
        message: "Content can not be empty!"
      });
  else 
    Projects.updateByID(req.params.id, new Projects(req.body), (err, table) => {
      if (err) 
        res.status(500).json(err); // something went wrong with the server or database
      else
        if (table.affectedRows === 0) // database sent back empty results
          res.status(404).json({
            message: "Cannot update project at id: " + req.params.id,  
          });
        else
          res.json(table);
    }); 
}

// handles specific project delete by ID on DELETE
exports.deleteByID = (req, res) => {
  Projects.deleteByID(req.params.id, (err, table) => {
    if (err)
      res.status(500).json(error);
    else
      if (table.affectedRows === 0)
        res.status(404).json({
          message: "Cannot not find project at id: " + req.params.id,
        });
      else
        res.json({
          error: false,
          message: 'project successfully deleted'
        });
  });
}

// handles entire projects table deletion on DELETE 
exports.deleteAll = (req, res) => {
  Projects.deleteAll((err, table) => {
    if (err)
      res.status(500).json(error);
    else
      res.json({
        error: false,
        message: 'all projects successfully deleted'
      });
  });
}
