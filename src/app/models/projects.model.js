/*****************************************************************
 * Defines the constructor for the projects object and uses the 
 * MySQL database connection to write CRUD functions.
 * 
 * @author Harmon Transfield
 * @description Created for assignment 4, COMPX322-21A
 *****************************************************************/

const db = require("./db");

/**
 * Instantiates a new Projects object.
 * 
 * @constructor
 * @param {JSON} projects An object representing a new project
 */
const Projects = function(projects) {
    this.projectname = projects.projectname;
    this.projectdesc = projects.projectdesc;
    this.startdate = projects.startdate;
    this.enddate = projects.enddate;
}

/**
 * Creates a new projects object and sends it to the database to 
 * create a new entry in the table.
 * 
 * @param {JSON} newProject The project sent from the client
 * @param {function} result Callback function to handle results of response
 */
Projects.create = (newProject, result) => {
    db.query('INSERT INTO projects SET ?', newProject, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            console.log('created project: ', {id: res.insertId, ...newProject});
            result(null, {id: res.insertId, ...newProject});
        }
        
    });
}

/**
 * Sends a query to the database that will retrieve every current project
 * available.
 * 
 * @param {function} result Callback function to handle results of response
 */
Projects.getAll = result => {
    db.query('SELECT * FROM projects', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            console.log('projects :', !res || !res.length ? 'empty response ' + res : res);
            result(null, res);
        }        
    });
}

/**
 * Sends a query to the database that will retrieve a project based on
 * ID number.
 * 
 * @param {int} id A unique identifier for a project
 * @param {function} result Callback function to handle results of response
 */
Projects.getByID = (id, result) => {
    db.query('SELECT * FROM projects WHERE id=?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            console.log('projects :', !res || !res.length ? 'empty response ' + res : res);
            result(null, res);
        }
    });
}

/**
 * Sends a query to the database that will retrieve a project based on
 * projectname.
 * 
 * @param {string} projectname The name of the project being retrieved 
 * @param {function} result Callback function to handle results of response
 */
Projects.getByProjectname = (projectname, result) => { 
    console.log('name ', projectname);
    db.query('SELECT * FROM projects WHERE projectname=?', projectname, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            console.log('projects :', !res || !res.length ? 'empty response ' + res : res);
            result(null, res);
        }     
    });
}

/**
 * Updates entries in the database
 * 
 * @param {int} id The unique identifier of the project being updated
 * @param {JSON} project A new object containing updated keys
 * @param {function} result Callback function to handle results of response
 */
Projects.updateByID = (id, project, result) => {
    db.query(
        'UPDATE projects SET projectname=?, projectdesc=?, startdate=?, enddate=? WHERE id=?', 
        [project.projectname, project.projectdesc, project.startdate, project.enddate, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);   
            } else {
                result(null, res.affectedRows);
            }          
        }
    );
} 

/**
 * Sends a query to the database to delete a row with a specified ID number
 * 
 * @param {int} id The unique identifier of the project being deleted
 * @param {function} result Callback function to handle results of response
 */
Projects.deleteByID = (id, result) => { 
    db.query('DELETE FROM projects WHERE id=?', [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res.affectedRows);
        }
    });
}

/**
 * Sends a query to the database to delete every entry in the table
 * 
 * @param {function} result Callback function to handle results of response
 */
Projects.deleteAll = result => {
    db.query('DELETE FROM projects', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

module.exports = Projects;