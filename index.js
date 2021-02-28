const mysql = require('mysql2');

//Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    post: 3306,
    user: 'root',
    password: '*GetDone21$#',
    database: 'company_employees'    
});

connection.connect(err => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId);
    output();
});

output = () => {
    console.log('Select all the products...\n');
    connection.query('SELECT * FROM department', function(err, res) {
        if(err) throw err;
        //Show all the results
        console.log(res);

        connection.end();
    });
};