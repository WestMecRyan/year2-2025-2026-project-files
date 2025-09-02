const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded()); // allows us to use information coming from forms
app.use(express.json());
app.set('view engine', 'ejs');
app.use(logger);
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}
app.get('/', (req, res) => {
    // res.sendStatus(500);
    // res.status(500).send('hello');
    // res.download('server.js');
    // res.status(500).json({ message: 'hello' });
    res.render('index', { text: 'World' });
})
// app.post()
// app.put()
// app.delete()
const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.listen(3000);