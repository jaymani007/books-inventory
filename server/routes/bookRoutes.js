const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { protect } = require('../middlewares/authMiddleware');
const bookController = require('../controllers/bookController');


const router = express.Router();


router.use(protect);


router.post('/',
[
body('title').isString().notEmpty(),
body('author').isString().notEmpty(),
body('price').isNumeric(),
body('category').isString().notEmpty(),
body('inStock').optional().isBoolean()
],
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
next();
},
bookController.createBook
);


router.get('/', bookController.getBooks);


router.get('/:id',
[ param('id').isMongoId() ],
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
next();
},
bookController.getBook
);


router.put('/:id',
[ param('id').isMongoId() ],
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
next();
},
bookController.updateBook
);


router.delete('/:id',
[ param('id').isMongoId() ],
(req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
next();
},
bookController.deleteBook
);


module.exports = router;