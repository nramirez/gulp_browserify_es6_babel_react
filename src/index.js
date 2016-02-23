import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import exphbs from 'express-handlebars';

const app = express();
const PORT = 8000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/', express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, () => {
  console.log('Server is listening on port: ', PORT);
});

//routes
app.get('/', function (req, res) {
    res.render('home');
});
