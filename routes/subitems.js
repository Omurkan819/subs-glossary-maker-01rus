const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Subitem = require('../models/Subitem');

// @route     GET api/subitems
// @desc      Get all users subitems
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const subitems = await Subitem.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(subitems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/subitems
// @desc      Add new subitem
// @access    Private
router.post(
  '/',
  auth,
  check('subtitle', 'Subtitle is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { subtitle, translation, comment, type } = req.body;

    try {
      const newSubitem = new Subitem({
        subtitle,
        translation,
        comment,
        type,
        user: req.user.id
      });

      const subitem = await newSubitem.save();

      res.json(subitem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/subitems/:id
// @desc      Update subitem
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { subtitle, translation, comment, type } = req.body;

  // Build subitem object
  const subitemFields = {};
  if (subtitle) subitemFields.subtitle = subtitle;
  if (translation) subitemFields.translation = translation;
  if (comment) subitemFields.comment = comment;
  if (type) subitemFields.type = type;

  try {
    let subitem = await Subitem.findById(req.params.id);

    if (!subitem) return res.status(404).json({ msg: 'Subitem not found' });

    // Make sure user owns subitem
    if (subitem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    subitem = await Subitem.findByIdAndUpdate(
      req.params.id,
      { $set: subitemFields },
      { new: true }
    );

    res.json(subitem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/subitems/:id
// @desc      Delete subitem
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const subitem = await Subitem.findById(req.params.id);

    if (!subitem) return res.status(404).json({ msg: 'Subitem not found' });

    // Make sure user owns subitem
    if (subitem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Subitem.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Subitem removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
