const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
    res.ok({ success: 'true' })
});
router.get('/products', (req, res) => {
    _models.Product.find({}, function (err, docs) {
        if (!err) {
            res.ok(200, { success: true, message: 'User collection cleared', data: docs });
        }
        else {
            res.error(400, { info: err, message: 'Some error occurred' });
        }
    })
})


module.exports = router;
