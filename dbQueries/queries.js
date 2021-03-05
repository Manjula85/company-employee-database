
 module.exports = function(obj, ...props) { 
    dbAllRoles= () => {
        console.log('Select all the roles...\n');
        connection.query('SELECT * FROM roles', function(err, res) {
            if(err) throw err;
            //Show all the results
            console.table(res);
    
            inqStart();
    
            //connection.end();  //Does this ever get executed then?
            //restartQ();
        });
    };
}

  //module.exports = dbAllRoles;
