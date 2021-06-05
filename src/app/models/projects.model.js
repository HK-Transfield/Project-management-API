const db = require("./db");

/**
 * @constructor
 * @param {JSON} projects 
 */
const Projects = function(projects) {
    this.projectname = projects.projectname;
    this.projectdesc = projects.projectdesc;
    this.startdate = projects.startdate;
    this.enddate = projects.enddate;
}

/**
 * 
 * @param {*} newProject 
 * @param {*} result 
 */
Projects.create = (newProject, result) => {
    db.query('INSERT INTO projects SET ?', newProject, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {
            console.log('created project: ', {id: res.insertID, ...newProject});
            result(null, {id: res.insertID, ...newProject});
        }
        
    });
}

/**
 * 
 * @param {*} result 
 */
Projects.getAll = result => {
    db.query('SELECT * FROM projects', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('projects :', !res || !res.length ? 'empty' : res);
            result(null,res);
        }        
    });
}

/**
 * 
 * @param {*} id 
 * @param {*} result 
 */
Projects.getByID = (id, result) => {
    db.query('SELECT * FROM projects WHERE id=?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('projects :', !res || !res.length ? 'empty' : res);
            result(null,res);
        }
    });
}

/**
 * 
 * @param {*} projectname 
 * @param {*} result 
 */
Projects.getByProjectname = (projectname, result) => { 
    console.log('name ', projectname);
    db.query('SELECT * FROM projects WHERE projectname=?', projectname, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('projects :', !res || !res.length ? 'empty' : res);
            result(null,res);
        }     
    });
}

/**
 * 
 * @param {*} id 
 * @param {*} project 
 * @param {*} result 
 */
Projects.updateByID = (id, project, result) => {
    db.query(
        'Update projects set projectname=?, projectdesc=?, startdate=?, enddate=? WHERE id=?', 
        [project.projectname, project.projectdesc, project.startdate, project.enddate, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);   
            } else {
                console.log('projects :', res);
                result(null,res);
            }          
        }
    );
} 

/**
 * 
 * @param {*} id 
 * @param {*} result 
 */
Projects.deleteByID = (id, result) => { 
    db.query('DELETE FROM projects WHERE id=?', [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('DELETED :', res);
            result(null,res);
        }
    });
}

Projects.deleteAll = result => {
    db.query('DELETE FROM projects', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('DELETED :', res);
            result(null,res);
        }
    });
}


module.exports = Projects;