const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result);
  } catch (error) {
    if (error.isJoi) {
      res.status(400).json({ error });
    } else {
      res.status(500).json({ error });
    }
  }
};

module.exports = { controllerHandler };
