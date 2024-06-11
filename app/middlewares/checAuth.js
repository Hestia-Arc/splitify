import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkAuth = async (request, response, next) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });
  }

  token = token.split(" ")[1];

  try {
    const user = await JWT.verify(token, process.env.JWT_SECRET);

    req.user = user.email;

    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized",
        },
      ],
    });
  }
};
