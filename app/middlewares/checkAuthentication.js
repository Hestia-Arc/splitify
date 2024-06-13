const jwt = require("jsonwebtoken");

async function checkAuthentication(request, response, next) {
  let token = request.header("authorization");

  if (!token) {
    return response.status(403).json({
      data: {
        errors: {
          message: "Unauthorized",
        },
      },
    });
  }

  token = token.split(" ")[1];

  try {
    const user = await jwt.verify(token, process.env.API_KEY);

    request.user = user.id;

    next();
  } catch (error) {
    return response.status(403).json({
      data: {
        errors: {
          message: "Unauthorized",
        },
      },
    });
  }
}

module.exports = checkAuthentication;
