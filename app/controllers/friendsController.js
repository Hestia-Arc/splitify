const service = require("../services/friendsService");

// ------------------- GET ALL...done
async function index(request, response) {
  try {
    const results = await service.getFriends(request.params.owner);

    response.json({ data: results });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response.status(500).json({ data: { error: "Error querying database" } });
  }
}

// ------------------- GET A FRIEND ...done
async function show(request, response) {
  try {
    const result = await service.getFriend(request.params);

    response.json({ data: result });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

// ------------------- SAVE..done
async function store(request, response) {
  try {
    const result = await service.createFriend(request.body, request.params.id);

    response.status(201).json({ data: result });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

// ------------------- UPDATE
async function update(request, response) {
  try {
    const result = await service.updateFriend(request.params, request.body);

    response.status(201).json(result);
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

// ------------------- REMOVE
async function remove(request, response) {
  try {
    const result = await service.deleteFriend(request.params);

    response.status(200).json(result);
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  remove,
};
