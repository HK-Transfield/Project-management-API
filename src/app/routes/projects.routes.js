/*****************************************************************
 * Defines the routes that associates CRUD operations (GET, POST, 
 * PUT, DELETE), a URL path, and a function called to handle how 
 * the server will respond when the client sends a request for an 
 * endpoint.
 * 
 * There are also endpoints used in Postman for testing each route, 
 * as well as any request bodies used in the request.
 * 
 * @author Harmon Transfield, 1317381
 * @description Created for assignment 4, COMPX322-21A
 *****************************************************************/

module.exports = app => {
  const projects = require("../controllers/projects.controller");

  /**
   * Endpoint: 
   *      GET/projects
   */
  app.get('/projects', projects.getAll); // retrieve all projects from the database

  /**
   * Endpoint:
   *      POST/projects
   * 
   * 200 status request body (JSON):
   *     {
   *        "projectname": "test projectname",
   *        "projectdesc": "Some description",
   *        "startdate": "2031-09-04",
   *        "enddate": "3499-30-23"
   *      }
   * 
   * 404 status request body (JSON): {}
   */ 
  app.post('/projects', projects.create); // create new projects and save it back to the database

  /**
   * Endpoints:
   *      GET/projects/project?projectname=Library%20Management%20System (200 status code)
   *      GET/projects/project?projectname=ProjectDoesNotExist           (404 status code)
   */
  app.get('/projects/project', projects.getByProjectname); // retrieve projects by project name

  /**
   * Endpoints:
   *      GET/projects/4    (200 status code)
   *      GET/projects/2343 (404 status code)
   */
  app.get('/projects/:id', projects.getByID); // retrieve projects from database by ID

  /**
   * Endpoints:
   *      PUT/projects/2    (200 status code)
   *      PUT/projects/3434 (404 status code)
   * 
   * 200 status request body (JSON):
   *     {
   *        "projectname": "update projectname",
   *        "projectdesc": "Some new description",
   *        "startdate": "2011-09-04",
   *        "enddate": "2012-30-23"
   *      }
   *  
   * 404 status request body (JSON): {}
   */
  app.put('/projects/:id', projects.updateByID); // update project data by ID
  
  /**
   * Endpoints:
   *      DELETE/projects/1     (200 status code)
   *      DELETE/projects/1111  (404 status code)
   */
  app.delete('/projects/:id', projects.deleteByID); // delete projects from database by ID

  /**
   * Endpoint:
   *      DELETE/projects
   */
  app.delete('/projects', projects.deleteAll); // deletes all projects from the database
}