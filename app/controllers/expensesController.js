const service = require("../services/expensesService");

// ------------------- GET ALL
async function index(request, response) {
  try {
    const results = await service.getExpenses();

    response.json({ data: results });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response.status(500).json({ data: { error: "Error querying database" } });
  }
}

// ------------------- GET AN EXPENSE
async function show(request, response) {
  try {
    const result = await service.getPost(request.params.post);

    response.json({ data: result });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

// ------------------- SAVE
async function store(request, response) {
  try {
    const result = await service.createPost(request.body);

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
    const result = await service.createPost(request.body);

    response.status(201).json({ data: result });
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
    const result = await service.createPost(request.body);

    response.status(201).json({ data: result });
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
