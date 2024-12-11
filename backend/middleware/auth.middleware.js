import jsonwebtoken from "jsonwebtoken";
const key = process.env.TOKEN_SECRETE_KEY;
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const userId = jsonwebtoken.verify(token, key);
    req.user = userId;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
