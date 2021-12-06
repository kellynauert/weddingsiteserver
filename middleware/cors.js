module.exports = function (req, res, next) {
  process.env.PORT === '3000'
    ? res.header('access-control-allow-origin', 'http://localhost:3001')
    : res.header(
        'access-control-allow-origin',
        'https://steel-wedding-server.herokuapp.com'
      );
  res.header('access-control-allow-credentials', 'true');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
  res.header(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Options'
  );
  next();
};
