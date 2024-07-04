import express from 'express';
import User from '../model/users.js';

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.json(await User.find({})).status(200);
});

export default router;
