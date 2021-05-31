const db = require("./db");

/**
 * @constructor
 * @param {*} projects 
 */
const Projects = (projects) => {
    this.id = projects.id;
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
            return;
        }
        console.log('created project: ', {id: res.insertID, ...newProject});
        result(null, {id: res.insertID, ...newProject});
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
            return
        }
        console.log('projects :', res);
        result(null,res);
    });
}

Projects.getByID = (id, result) => {
    db.query('SELECT * FROM projects WHERE id=?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return
        }
        console.log('projects :', res);
        result(null,res);
    });
}

Projects.getByProjectname = (projectname, result) => { 
    db.query('SELECT * FROM projects WHERE projectname=?', projectname, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return
        }
        console.log('projects :', res);
        result(null,res);
    });
}

Projects.updateByID = (id, project, result) => {
    db.query(
        'Update projects set projectname=?, projectdesc=?, startdate=?, enddate=? WHERE id=?', 
        [project.projectname, project.projectdesc, project.startdate, project.enddate, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return
            }
            console.log('projects :', res);
            result(null,res);
        }
    );
} 

Projects.deleteByID = (id, result) => { 

    db.query('DELETE FROM projects WHERE id=', [id], (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return
        }
        console.log('DELETED :', res);
        result(null,res);
    });
}

Projects.deleteAllProjects = result => {
    
}


module.exports = Projects;