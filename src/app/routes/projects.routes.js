module.exports = app => {
  const projects = require("../controllers/projects.controller");
  const router = app.router();

  // get a list or all projects available in the database
  app.get('/projects', projects.getAll); 

  // create new projects and save it back to the database
  app.post('/projects', projects.create);

  // get projects by project ID
  app.get('/projects/:id', projects.getByID);

  // update project information by project ID
  app.put('/projects/:id', projects.updateByID);

  // get projects by project name
  app.get('/projects/:projectname', projects.getByProjectname);
  
  // delete project by project ID
  app.delete('/projects/:id', projects.deleteByID);
}