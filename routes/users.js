const express = require("express");
const router = express.Router();
const fs = require("fs");
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
      res.json({
        accessToken,
      });
    } else {
      res.send("Username or password incorrect");
    }
  });
});

router.post("/signup", (req,res) => {
  const user = req.body;
  user.token = jwt.sign(
    { username: user.username, role: user.role },
    accessTokenSecret
  );
  res.json(user);
  const data = dataBase(user);
  fs.writeFile(
    "./database/users.json",
    JSON.stringify(data),
    { encoding: "utf-8" },
    (err) => {
      if (err) res.send(err);
      return;
    }
  );
  res.send("User added!");
})

function dataBase(user) {
  fs.readFile("./database/users.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
    }

    let jsonData = JSON.parse(data);
    console.log(jsonData);
    jsonData.push(user);
    return jsonData;
  });
}

module.exports = router;