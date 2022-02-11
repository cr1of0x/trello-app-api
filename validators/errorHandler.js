const errorHandler = (key, message, res) => {
  return res.status(400).json({
    error: {
      details: [
        {
          message: `${message}`,
          context: {
            key: `${key}`,
          },
        },
      ],
    },
  });
};

module.exports = errorHandler;
