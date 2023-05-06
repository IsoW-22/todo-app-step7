const router = require("express").Router();
const fs = require("fs");

const authenticateJWT = require("./auth/auth");

/**
 * Receives the todos in form of json and stores them in the database/todos.json file
 */
router.post("/upload", authenticateJWT, (req, res) => {
  const todos = req.body;
  fs.writeFile(
    "./database/todos.json",
    JSON.stringify(todos),
    { encoding: "utf-8" },
    (err) => {
      if (err) res.send(err);
      return;
    }
  );
  res.send("Success");
});

/**
 * Sends todos from the database/todos.json file as json
 */
router.post("/download", (req, res) => {
  const { token } = req.body;
  fs.readFile("./database/users.json", (err, data) => {
    if (err) throw err;

    const users = JSON.parse(data);

    const user = users.find((u) => {
      return u.token === JSON.parse(token);
    });

    if (user) {
      res.json(user.todos);
    } else {
      res.sendStatus(401);
    }
  });
});

module.exports = router;
