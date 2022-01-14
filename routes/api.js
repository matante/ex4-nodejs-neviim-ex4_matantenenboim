/**
 * this handles all the request for information from the api
 */

"use strict";
var express = require('express');
var router = express.Router();
const db = require('../models'); //contain the User model, which is accessible via db.User


/**
 * returns the images related to this user, id-ed by email
 */
router.get('/images', async function (req, res) {

    if (req.session.email) {
        const result = await db.Image.findAll({
            where: {
                email: req.session.email
            }
        });
        return (result) ? res.json(result) : res.json(null);

    } else {
        return res.status(404).send();
    }

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * handles requests to delete a specific photo of a user from the db
 */
router.delete('/images', async function (req, res) {
    if (req.session.email) {
        db.Image.destroy({
            where: {
                email: req.session.email,
                imageID: req.body.id
            }
        })
            .then(res.status(200).send());
    } else {
        return res.status(404).send();
    }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * handles reuqests to delete ALL photos of a user from the db
 */
router.delete('/images/all', async function (req, res) {
    if (req.session.email) {
        db.Image.destroy({
            where: {email: req.session.email}
        })
            .then(res.status(200).send());
    } else {
        return res.status(404).send();
    }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * handles requests to check if a specific email is already registered to this site
 */
router.get('/users/:email', function (req, res) {
    if (req.session.email) {
        const email = req.params.email.trim().toLowerCase();

        db.User.findOne({
            where: {email: email},
        }).then(user => {
            return (!user) ? res.json({found: false}) : res.json({found: true});

        }).catch(() => {
            return res.json({found: true}); // in case of error, don't add
        });
    } else {
        return res.status(404).send();
    }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


/**
 * handles requests to add a photo to the db
 */
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
            .catch((err, image) => {
                console.log('*** error creating a user', JSON.stringify(image));
                return res.status(400).send(err);
            });
    } else {
        return res.status(404).send();
    }

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * handles requests to check if the user already saved a specific photo
 */
router.get('/images/:id', async function (req, res) {

    if (req.session.email) {
        const result = await db.Image.findAll({
            where: {
                imageID: req.params.id,
                email: req.session.email
            }
        });
        return (result[0]) ? res.json({found: true}) : res.json({found: false});

    } else {
        return res.status(404).send();
    }

});

module.exports = router;
