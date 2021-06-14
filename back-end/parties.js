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
    participants: Number,
});

const Party = mongoose.model('Party', partySchema);

router.post("/", validUser, async (req, res) => {
    const party = new Party({
      user: req.user,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      city: req.body.city,
      participants: 1
    });
    try {
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
        user: req.user
      }).populate('user');
      return res.send(parties);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  router.get("/city", validUser, async (req, res) => {
    try {
      let parties = await Party.find({
        user: req.body.city
      }).populate('user');
      return res.send(parties);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  module.exports = {
    model: Party,
    routes: router,
  }
