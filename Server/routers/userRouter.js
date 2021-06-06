const router = require("express").Router();
const User = require("../Models/userModel");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    if (!email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter required fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter password atleast of length 6" });
    }
    if (password !== passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter same password twice" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ errorMessage: "Account already exists" });
    }

    //hashing password

    const salt = await bycrpt.genSalt();
    const passwordHash = await bycrpt.hash(password, salt);

    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();
    //token sign in
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    //send token in HTTPonly cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ errorMessage: "wrong email or password" });
    }

    const passwordCorrect = await bycrpt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "wrong email or password" });
    }

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    //send token in HTTPonly cookie

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }

  //logout

  router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  });
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);
  } catch (error) {
    res.json(false);
  }
});

module.exports = router;
