const router = require('express').Router();

router.get("/", (req, res) => {
    return res.send("Responding from server!");
}); 

router.post("/join", (req, res) => {

});


module.exports = router;
