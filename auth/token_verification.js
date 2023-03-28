const {verify} = require("jsonwebtoken")

module.exports = {

  checkToken: async (req, res, next) => {
    const token1 = await req.get("authorization");
    if (token1) {
      const token = token1.slice(7)
      verify(token, process.env.secretKey, (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: "invalid token"
          })
        } else {
          next();
        }
      })



    } else {
      res.json({
        success: 0,
        message: "Access Denied: unauthorized user"
      });
    }
  }

  


}