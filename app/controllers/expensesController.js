const service = require("../services/expensesService");

// ------------------- GET ALL...done
async function index(request, response) {
  try {
    const results = await service.getExpenses(request.params.owner);

    response.json({ data: results });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response.status(500).json({ data: { error: "Error querying database" } });
  }
}

// ------------------- GET AN EXPENSE ...done
async function show(request, response) {
  try {
    const result = await service.getExpense(request.params);

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
    const result = await service.createExpense(request.body, request.params.id);

    response.status(201).json({ data: result });
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

// ------------------- UPDATE ....done
async function update(request, response) {
  try {
    const result = await service.updateExpense(request.params, request.body);

    response.status(201).json(result);
  } catch (error) {
    console.log(`Error querying database: ${error}`);

    response
      .status(error.statusCode ?? 500)
      .json({ data: { error: `${error.message}` } });
  }
}

// ------------------- REMOVE ... done
async function remove(request, response) {
  try {
    const result = await service.deleteExpense(request.params);

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
