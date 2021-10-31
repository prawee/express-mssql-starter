const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const registRouter = require('./routes/registration');

// Body Parser Middleware
app.use(bodyParser.json()); 

// Routing
app.use('/', indexRouter);
app.use('/api/registration', registRouter);

//CORS Middleware
app.use((req, res, next) => {
  //Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization'
  );
  next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

//Setting up server
const server = app.listen(process.env.PORT || 8080, function() {
  const port = server.address().port;
  console.log('App now running on port', port);
});
