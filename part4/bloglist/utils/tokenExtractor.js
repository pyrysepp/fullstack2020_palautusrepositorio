const getTokenFrom = (request, response, next) => {
  const auth = () => {
    const authorization = request.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      return authorization.substring(7);
    }
    return null;
  };

  request.token = auth();

  next();
};

module.exports = getTokenFrom;
