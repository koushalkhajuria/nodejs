const {
  createUser, 
  getUserById, 
  getAllUsers, 
  updateUsers, 
  deleteUser,
  login
} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_verification");


router.post("/", checkToken, createUser);
router.get("/:id", checkToken, getUserById);
router.get("/", checkToken, getAllUsers);
router.put("/", checkToken, updateUsers);
router.delete("/:id", checkToken, deleteUser);
router.post("/login", login);



module.exports = router;
