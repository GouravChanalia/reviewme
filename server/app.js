require("dotenv").config();
const cors = require("cors");
const Express = require("express");
const jwt = require("jsonwebtoken");
const app = Express();
/** To enable cross origin requests */
app.use(cors());

/** parse req.body */
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.post("/", function (req, res) {
  jwt.verify(req.body.token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      res
        .sendStatus(401)
        .json({ errorMessage: "refreshToken expired", error: err });
      return;
    }
    /** create new authentication token */
    res.json({ success: "success" });
    return;
  });
});

app.post("/sign-up", function (req, res) {
  console.log(req.body);
  res.sendStatus(201);
});

app.post("/login", function (req, res) {
  /** get req.body */
  /** match cred. */
  /** if match, generate jwt token */
  let token = jwt.sign({ username: req.body.email }, process.env.PRIVATE_KEY, {
    expiresIn: 60,
  });
  let refreshToken = jwt.sign(
    { username: req.body.email },
    process.env.PRIVATE_KEY,
    {
      expiresIn: "2d",
    }
  );
  res.status(200).json({ token, refreshToken });
  /** if not match, return error message */
});

app.post("/refresh-token", function (req, res) {
  jwt.verify(req.body.token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      res
        .sendStatus(401)
        .json({ errorMessage: "refreshToken expired", error: err });
      return;
    }
    /** create new authentication token */
    let token = jwt.sign(
      { username: decoded.username },
      process.env.PRIVATE_KEY,
      {
        expiresIn: 60,
      }
    );
    res.json({ token });
    return;
  });
});
module.exports = app;
