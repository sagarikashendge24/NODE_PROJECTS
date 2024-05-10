var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nav@gur1",
  database:"Project3",
  connection: {
    filename: "./mydb.sqlite"
 },
 useNullAsDefault: true
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // ####### CREATING A  SIGNUP TABLE ######
  // var sql ="CREATE TABLE signup (ID INT AUTO_INCREMENT PRIMARY KEY,Email VARCHAR(200) ,Password VARCHAR(2000))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });

 // ####### CREATING A  POST TABLE ######
  //  var sql ="CREATE TABLE post (ID INT ,Email VARCHAR(2000),Post VARCHAR(2000))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });

  // var sql ="CREATE TABLE likedislike (ID INT PRIMARY KEY,Like VARCHAR(2000),Dislike VARCHAR(2000))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // });






});

module.exports=con; 