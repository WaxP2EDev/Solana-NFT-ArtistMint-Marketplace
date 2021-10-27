const express = require("express");
const cors = require("cors");
const fs = require('fs');
const app = express();
const mysql = require('mysql');
const { resolveModuleName } = require("typescript");

const port = process.env.PORT || 3030;
const baseUrl = '0.0.0.0';

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'solaminter'
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/initDb", (req, res) => {
  var sql = "CREATE TABLE transaction (id INT AUTO_INCREMENT PRIMARY KEY, fee DOUBLE, transaction_at DATETIME";
  connection.query(sql, function (err, result) {
    if(err) throw err;
    console.log("Table created");
  });

  res.status(200).send('');
})

app.post("/api/saveTransaction", async(req, res) => {

  let fee = await getCurrentFee();
  
  connection.query("INSERT INTO tbl_transaction (fee) VALUES (?)", fee, (err,result)=>{
    if(err) {
      res.status(500).send({err});                       
    } 
    else {
      res.status(200).send({result});
    }
  });
})

app.post("/api/getTransactions", (req, res) => {
  $start_date = '2021-10-02 00:00:00';
  connection.query("SELECT * FROM tbl_transaction WHERE transaction_time >= ?", $start_date, (err, result) => {
    if(err)
      res.status(500).send({err});
    else {
      var count_result = [];
      result.map((item, index) => {
        let datum = {
          time: '',
          value: 0
        };
        let transaction_time = item.transaction_time + " ";
        let date_index = transaction_time.indexOf(' ');
        let date = transaction_time.substr(date_index+1);
        let cut_index = date.indexOf(':');
        let time = date.substr(0, cut_index-3);

        datum.time = time;
        datum.value = 1;
        if(index == 0)
        {
          count_result.push(datum);
        }
        else {
          let flag = false;
          count_result.map((income) => {
            if(income.time == datum.time) {
              income.value += 1;
              flag = true;
            }
          });
          if(!flag){
            count_result.push(datum);
          }
        }
      });
      
      console.log(count_result);
      res.status(200).send({count_result});
    }
  });
})

app.post("/api/getIncome", (req, res) => {
  $start_date = '2021-10-02 00:00:00';
  connection.query("SELECT * FROM tbl_transaction WHERE transaction_time >= ?", $start_date, (err, result) => {
    if(err)
      res.status(500).send({err});
    else {
      var income_result = [];
      result.map((item, index) => {
        let datum = {
          time: '',
          value: 0
        };
        let transaction_time = item.transaction_time + " ";
        let date_index = transaction_time.indexOf(' ');
        let date = transaction_time.substr(date_index+1);
        let cut_index = date.indexOf(':');
        let time = date.substr(0, cut_index-3);

        datum.time = time;
        datum.value = item.fee;
        if(index == 0)
        {
          income_result.push(datum);
        }
        else {
          let flag = false;
          income_result.map((income) => {
            if(income.time == datum.time) {
              income.value += datum.value;
              flag = true;
            }
          });
          if(!flag){
            income_result.push(datum);
          }
        }
      });
      
      console.log(income_result);
      res.status(200).send({income_result});
    }
  });
})

app.post("/api/setFee", (req, res) => {
    
  var fee = req.body.fee;

  connection.query("UPDATE tbl_fee SET fee = ? WHERE id = 1", fee, (err,result)=>{
    if(err) {
      res.status(500).send({err});                       
    } 
    else {
      res.status(200).send({result});
    }
  });  
})

app.post("/api/getFee", async(req, res) => {    
  
  let fee = await getCurrentFee();
  res.status(200).send({fee});  

})

const getCurrentFee = async() => 
{
  return new Promise((resolve, reject) => {
    connection.query("SELECT fee FROM tbl_fee WHERE id = ?", 1, (err, result) => {
      console.log(`result: ${result[0].fee}`);
      resolve(result[0].fee);
    });
  })
}

// https.createServer(httpsOptions, app).listen(port, baseUrl, () => {
app.listen(port, baseUrl, () => {
  console.log("server is listening on port 3030");
  console.log(baseUrl);
});
