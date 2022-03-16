const http = require('./app');
const { initDb } = require('./db');

const port = process.env.PORT || 5000;

initDb((err) => {
  if (err) {
    console.log('Could not connect to mongodb: ', err);
  } else {
    http.listen(port, () => {
      console.log('Listening on port: ', port);
    });
  }
});
