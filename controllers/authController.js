const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIES_IN,
  });
};

const setToken = (user, res) => {
  const token = signToken(user._id);
  let cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
};

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

exports.login = async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          status: "error",
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      let user = await User.findOne({ email: profile.email });
      if (!user) {
        user = new User({
          name: profile.name,
          email: profile.email,
          photo: profile.picture,
        });

        await user.save();
      }

      setToken(user, res);

      res.status(201).json({
        status: "success",
        message: "Login was successful",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An error occured. Login failed.",
    });
  }
};

exports.protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "You are not logged in! Please log in to get access",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "error",
      message: "The user belonging to this token does no longer exist",
    });
  }

  req.user = currentUser;
  next();
};

exports.checkLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt;
    try {
      if (!token) {
        return res.status(401).json({
          status: "error",
          message: "You are not logged in! Please log in to get access",
        });
      }

      const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return res.status(401).json({
          status: "error",
          message: "The user belonging to this token does no longer exist",
        });
      }

      return res.status(201).json({
        status: "success",
        message: "Login was successful",
        user: currentUser,
      });
    } catch (err) {
      return res.status(401).json({
        status: "error",
        message: err,
      });
    }
};
