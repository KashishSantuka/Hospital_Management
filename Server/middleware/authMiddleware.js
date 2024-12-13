import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Authentication

export const authentication = (req, res, next) => {
  try {
    const requestToken = req.headers.authorization;

    console.log("token: ", requestToken);

    const token = requestToken.split(" ")[1];

    if (!token) {
      res.status(400).json({
        success: false,
        message: "The user is not authorised",
      });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log(verifyToken);

    req.user = verifyToken;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Invalid token",
      //   error: message.error,
    });
  }
};

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const body = req.user;
    console.log("Body:", body);
    console.log("is is working?");
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized role",
      });
    }

    next();
  };
};
