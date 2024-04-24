const validateResource = (schema) => async (req, res, next) => {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  try {
    await schema.validateAsync(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      options
    );
    next();
  } catch (e) {
    return res.status(400).jsonp(e.details);
  }
};

module.exports = validateResource;
