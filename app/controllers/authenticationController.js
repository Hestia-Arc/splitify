const service = require("../services/authenticationService");

// ========================== save...done
async function register(request, response) {
  try {
    const results = await service.registerUser(request.body);

    response.json({ data: results });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

// ============================ login
async function login(request, response) {
  try {
    const results = await service.login(
      request.body.email,
      request.body.password
    );

    response.json({ data: results });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

// ============================= get user data  ...done
async function history(request, response) {
  try {
    const results = await service.userHistory(request);

    response.json({ data: results });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

module.exports = {
  register,
  login,
  history,
};
