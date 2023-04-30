const express = require("express");
const router = express.Router();
const fs = require("fs");
const fsp = fs.promises;
const jwt = require("jsonwebtoken");

/** @type {string} The secret secret to sign the JWT token. */
const accessTokenSecret = "thisisthesecretaccesstoke";

/**
 * The post url for getting the login info of the user and sending the access token
 */
router.post("/login", (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  fs.readFile("./database/users.json", (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);

    const user = users.find((u) => {
      return u.username === username && u.password === password;
    });

    if (user) {
      const accessToken = user.token;
      const fullname = user.fullname;
      res.json({
        accessToken,
        fullname,
      });
    } else {
      res.json("Username or password incorrect");
    }
  });
});

router.post("/signup", async (req,res) => {
  const user = req.body;
  user.token = jwt.sign(
    { username: user.username, email: user.email },
    accessTokenSecret
  );
  const data = await fsp.readFile("./database/users.json", { encoding: "utf-8" });
  const jdata = JSON.parse(data);
  jdata.push(user);
  await fsp.writeFile(
    "./database/users.json",
    JSON.stringify(jdata),
    { encoding: "utf-8" },
    (err) => {
      if (err) res.send(err);
      return;
    }
  );
  res.json("User added!");
})

module.exports = router;