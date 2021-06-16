const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const partySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
    title: String,
    description: String,
    date: Date,
    location: String,
    city: String,
    participants: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
});

const Party = mongoose.model('Party', partySchema);

router.post("/", validUser, async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.date || !req.body.location || !req.body.city)
    return res.status(400).send({
      message: "title, description, location, city and date are required"
    });
    
    try {
        const party = new Party({
        user: req.user,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        city: req.body.city,
        participants: [req.user]
        });

        await party.save();
        return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/", validUser, async (req, res) => {
    try {
      let parties = await Party.find({
      }).populate('user');
      return res.send(parties);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/user", validUser, async (req, res) => {
    try {
      let parties = await Party.find({
        user: req.user
      }).populate('user');
      return res.send(parties);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/:city", validUser, async (req, res) => {
    try {
      let parties = await Party.find({
        city: req.params.city
      }).populate('user');
      return res.send(parties);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      await Party.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  router.put('/:id', validUser, async (req, res) => {
    try {
      let party = await Party.findOne({
        _id: req.params.id
      });
      party.participants.push(req.user);
      await party.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  router.put('/remove/:id', validUser, async (req, res) => {
    try {
      let party = await Party.findOne({
        _id: req.params.id
      });
      let i = 0;
      for (i = 0; i < party.participants.length; ++i) {
        console.log('worked 1');
        console.log(party.participants[i]);
        console.log(req.user._id);
        if (party.participants[i] == req.user._id) {
            console.log('worked 2');
            party.participants = party.participants.splice(i, 1);
            break;
        }
      }
      await party.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  module.exports = {
    model: Party,
    routes: router,
  }
