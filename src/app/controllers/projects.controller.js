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
        res.status(500).send(err);
      else 
        res.json(projects);
    });
}

// handles a new project created on POST
exports.create = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0)  // check if the request body is not empty
    res.status(400).json({
      error: true,
      message: "Content can not be empty!"
    });
  else 
    Projects.create(new Projects(req.body), (err, newProject) => {
      if (err) // something went wrong with the server or database
        res.status(500).send(err);
      else 
        res.json(newProject);
    });
}

// displays specific project by name on GET
exports.getByProjectname = (req, res) => {
  Projects.getByProjectname(req.query.projectname, (err, projects) => {
    if (err) // something went wrong with the server or database
      res.status(500).send(err);
    else {
      if (!projects || !projects.length) // check that the project is not empty
        res.status(404).json({
          error: true,
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
    if (err) // something went wrong with the server or database
      res.status(500).send(err);
    else {
      if (!project || !project.length) // database sent back empty results
        res.status(404).json({
          error: true,
          message: "Cannot not find project with project id: " + req.params.id,  
        });
      else
        res.json(project);
    }
  });
}

// handles project update on PUT
exports.updateByID = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0)  // check if the request body is not empty
      res.status(400).json({
        error: true,
        message: "Content can not be empty!"
      });
  else 
    Projects.updateByID(req.params.id, new Projects(req.body), (err, affectedRows) => {
      if (err) 
        res.status(500).send(err); // something went wrong with the server or database
      else
        if (affectedRows === 0) // none of the rows in the database were affected
          res.status(404).json({
            error: true,
            message: "Failed to update project at id: " + req.params.id,  
          });
        else // success, project was updated with the request body
          res.json({
            error: false,
            message: "Successfully updated project at id: " + req.params.id,
          });
    }); 
}

// handles specific project delete by ID on DELETE
exports.deleteByID = (req, res) => {
  Projects.deleteByID(req.params.id, (err, affectedRows) => {
    if (err) // something went wrong with the server or database
      res.status(500).send(err);
    else
      if (affectedRows === 0) // no projects with the ID were affected
        res.status(404).json({
          error: true,
          message: "Failed to delete project at id: " + req.params.id,
        });
      else // success, the database removed the project with the ID parameter
        res.json({
          error: false,
          message: 'Successfully deleted project at id : ' + req.params.id,
        });
  });
}

// handles entire projects table deletion on DELETE 
exports.deleteAll = (req, res) => {
  Projects.deleteAll((err, table) => {
    if (err) // something went wrong with the server or database
      res.status(500).send(err);
    else // success, the database has deleted every entry in the table
      res.json({
        error: false,
        message: 'all projects successfully deleted'
      });
  });
}
