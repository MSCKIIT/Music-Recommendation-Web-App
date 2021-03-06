const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// app.use(cookieParser());

// router.get('/', [
//     check("name", "name is required").not().isEmpty(),
//     check("email", "Please enter a valid Email").isEmail(),
//     check(
//       'password',
//       'Please enter a password with 6 or more characters'
//     ) 
//   ], async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         res.json(user);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('server error');
//     }
// });

router.post(
  "/",

  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please enter a valid Email").isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    )
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // const isMatch = await bcrypt.compare(password, user.password);  
      let isMatch = 1  
            if(!isMatch) {
                return res .status(400).json({ errors: [{ msg: 'wrong password' }] });
            }
      if (user) {
          console.log("user Found ");
        const payload = {
          user: {
            id: user._id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        console.log('Registering new user');
        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
          });
          user = new User({
            name,
            email,
            avatar,
            password,
          });
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          // user.password = password
          await user.save(function (err, user) {
            if (err) console.log(err);
            else {
              console.log(user);
              global.id = user._id; //global variable is declared to use the name and id in artists collection .
              global.user_name = user.name;
            }
          });

          const payload = {
            user: {
              id: user._id,
            },
          };
          console.log(payload);
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
      }    
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//add a get route to the sawoUser then we can get hold of the data whether the user was previously logged in or not.

module.exports = router;
