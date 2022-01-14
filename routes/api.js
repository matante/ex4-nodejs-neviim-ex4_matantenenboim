var express = require('express');
var router = express.Router();
const db = require('../models'); //contain the User model, which is accessible via db.User
const keys = ['dragon leaf'];

//todo : delete, not for actual use, only debug!
router.get('/users', (req, res) => {
    return db.User.findAll()
        .then((users) => res.send(users))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            err.error = 1; // some error code for client side
            return res.send(err)
        });
});

//todo : delete, not for actual use, only debug!
router.get('/findAllImages', (req, res) => {
    return db.Image.findAll()
        .then((images) => res.send(images))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            err.error = 1; // some error code for client side
            return res.send(err)
        });
});


router.get('/images', async function (req, res) {

    if (req.session.email) {
        const result = await db.Image.findAll({
            where: {
                email: req.session.email
            }
        })
        if (result)
            return res.json(result);
        else
            return res.json(null);
    } else {
        return res.status(404).send()
    }

});

router.delete('/images', async function (req, res) {
    if (req.session.email) {
        db.Image.destroy({
            where: {
                email: req.session.email,
                imageID: req.body.id
            }
        })
            .then(res.status(200).send())
    } else {
        return res.status(404).send()
    }
})

router.delete('/images/all', async function (req, res) {
    if (req.session.email) {
        db.Image.destroy({
            where: {email: req.session.email}
        })
            .then(res.status(200).send())
    } else {
        return res.status(404).send()
    }
})


router.get('/users/:email', function (req, res) {
    if (req.session.email) {
        const email = req.params.email.toLowerCase();

        db.User.findOne({
            where: {email: email},
        }).then(user => {
            if (!user) {
                return res.json({found: false});
            }
            return res.json({found: true});

        }).catch(() => {
            return res.json({found: true}); // in case of error, don't add
        });
    } else {
        return res.status(404).send()
    }
});

router.get('/images', function (req, res) {
    return res.redirect("/");
});

router.post('/images', function (req, res) {

    if (req.session.email) {

        db.Image.create({
            imageID: req.body.ID,
            sol: req.body.Sol,
            earth_date: req.body.Earth_Date,
            camera: req.body.Camera,
            mission: req.body.Mission,
            url: req.body.url,
            email: req.session.email,
        })
            .then((image) => {
                return res.json(image);
            })
            .catch((err) => {
                console.log('*** error creating a user', JSON.stringify(image))
                return res.status(400).send(err)
            })
    } else {

        return res.status(404).send()
    }

});


router.get('/images/:id', async function (req, res) {

    if (req.session.email) {
        const result = await db.Image.findAll({
            where: {
                imageID: req.params.id,
                email: req.session.email
            }
        })
        if (result[0])
            return res.json({found: true});
        else
            return res.json({found: false});
    } else {

        return res.status(404).send()

    }

});

module.exports = router;
