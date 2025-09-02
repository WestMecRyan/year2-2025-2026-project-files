const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.query.name);
    res.send('users list');
});
router.get('/new', (req, res) => {
    // res.send('New user form');
    res.render("users/new", { firstName: "Test" });
});
router.post('/', (req, res) => {
    const isValid = true;
    if (isValid) {
        users.push({ firstName: req.body.firstName });
        res.redirect(`/users/${users.length - 1}`);
    }
    else {
        console.log('Error');
        res.render("users/new", { firstName: req.body.firstName });
    }
});
// router.post('/', (req, res) => {
//     console.log(req.body.firstName);
//     let firstName = req.body.firstName;

//     res.send(`created user ${firstName}`);
// });
// dynamic routes should be below static routes
router.route('/:id')
    .get((req, res) => {
        res.send(`created user${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`update user${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`delete user${req.params.id}`);
    })

const users = [{ name: "Kyle" }, { name: "Sally" }];
router.param("id", (req, res, next, id) => {
    // console.log(id);
    req.user = users[id];
    next()
})
// router.get('/:id', (req, res) => {
//     res.send(`created user${req.params.id}`);
// });
// router.put('/:id', (req, res) => {
//     res.send(`update user${req.params.id}`);
// });
// router.delete('/:id', (req, res) => {
//     res.send(`delete user${req.params.id}`);
// });
module.exports = router;