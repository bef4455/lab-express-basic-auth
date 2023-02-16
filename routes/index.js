const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// TOUT CE QUI EST DANS LE DOSSIER ./auth.routes A LE PREFIXE /auth SUR L'URL
router.use('/auth', require('./auth.routes'))


module.exports = router;
