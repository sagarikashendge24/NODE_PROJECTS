var mysql = require('mysql');
const axios=require('axios')

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nav@gur1",
  database:"Project2"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // ####### CREATING A TABLE ######
  // var sql ="CREATE TABLE data(id INT,name VARCHAR(200),logo VARCHAR(200),days_to_complete INT,short_description VARCHAR(200),type VARCHAR(200))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });
});

//  #### TO PUT JSON DATA INTO TABLE ####
    const url = 'https://api.merakilearn.org/courses'
    axios.get(url).then(response => {
        const data = (response.data);
        for (i of data){
            var sql = "INSERT INTO data (id,name,logo,days_to_complete,short_description,type) VALUES ?";
            var values = [
            [i['id'], i['name'],i['logo'],i['days_to_complete'],i['short_description'],i['type']]
            ];
            con.query(sql, [values])

        };    
    });
    
  // });


module.exports=con; 