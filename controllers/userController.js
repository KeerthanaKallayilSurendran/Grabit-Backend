const users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addUserController = async (req, res) => {
  console.log("Inside Add User Controller");
  const { username, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      console.log(12);

      res.status(406).json("Existing User... Please Login");
    } else {
      console.log(17);
      const hasPassword = await bcrypt.hash(password, 10);
      console.log(hasPassword);
      const newUser = new users({
        username,
        email,
        password: hasPassword,
        firstname: " ",
        lastname: " ",
        gender: " ",
        mobilenumber: " ",
        address: {
          street: " ",
          city: " ",
          state: " ",
          postalCode: " ",
          country: " ",
        },
        profileImg: " ",
      });
      console.log(newUser);

      await newUser.save();
      console.log(19);

      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.loginController = async (req, res) => {
  console.log("Inside Login Controller");
  const { email, password } = req.body;
  // console.log(email, password);

  try {
    const existingUser = await users.findOne({ email });
    // console.log(existingUser);
    if (existingUser) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      // console.log(isPasswordMatch);

      if (isPasswordMatch || password == existingUser.password) {
        // console.log(41);

        const token = jwt.sign(
          { userId: existingUser._id },
          process.env.JWTPASSWORD
        );
        // console.log(token);
        res.status(200).json({ user: existingUser, token });
      } else {
        res.status(404).json("Incorrect Password");
        // console.log(46);
      }
    } else {
      // console.log(48);
      res.status(404).json("Incorrect Email");
    }
  } catch (error) {}
};

exports.getUserDetailsController = async (req, res) => {
  console.log("Inside get user details controller");
  const userId = req.userId;

  try {
    const userDetails = await users.findById({ _id: userId });
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.updateUserDetailsController = async (req, res) => {
  console.log("Inside update user details controller");
  const userId = req.userId;
  console.log(req.body);

  const { firstname, lastname, mobilenumber, email, profileImg, address } =
    req.body;
  try {
    const updateUser = await users.findByIdAndUpdate(
      { _id: userId },
      {
        firstname,
        lastname,
        mobilenumber,
        email,
        profileImg,
        "address.street": address.street,
        "address.city": address.city,
        "address.state": address.state,
        "address.postalCode": address.postalCode,
        "address.country": address.country,
      },
      { new: true }
    );
    await updateUser.save();
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.allUserViewController = async (req, res) => {
  console.log("Inside all user view controller");
  try {
    const allUser = await users.find({ role: "User" });
    res.status(200).json(allUser);
  } catch (error) {
    res.status(401).json(error);
  }
};
