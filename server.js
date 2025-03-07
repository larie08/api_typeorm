require('rootpath')();
const expres = require("express");
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', require('./users/users.controller'));

app.use(errorHandler);

const part = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(prototype, () => console.log('Server listening on port ' + port));