const {
  create, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser,
  getUserByEmail
} = require("./user.service");
const {sign} = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    create(body, (err, results) =>{
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: "Inserted Successfully"
      });
    });
  },

  getAllUsers: (req, res) => {
    getAllUsers((error, results) => {
      if (error) {
        console.log(error);
        return
      };
      return res.status(200).json({
        success: 1,
        data: results
      });
    });

  },

  getUserById: (req, res) => {
    const body = req.params.id;
    const id = parseInt(body);
    getUserById(id, (err, results) => {

      if (err){
        return res.json(err)
      };
      if (!results){
        return res.status(404).json({
          success: 0,
          message: "Record not found"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });

  },
 
  updateUsers: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  
  deleteUser: (req, res) => {
    const data = req.params.id;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },

  login: (req,res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err)
        return
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Invalid email"
        })
      };
      if (results.password == body.password){
        results.password = undefined;
        const jsonToken = sign({result: results}, process.env.secretKey, {
          expiresIn: "1h"});
        return res.status(200).json({
            success: 1,
            message: "Login sucessful",
            token: jsonToken
          })
      } 
      else {
        return res.json({
          success: 0,
          message: "Invalid password"
        });
      }
        

    })

  }
  
}