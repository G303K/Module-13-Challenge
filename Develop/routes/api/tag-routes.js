const express = require("express");
const router = express.Router();
const { Tag, Product, ProductTag } = require("../../models");

// GET all tags including associated products
router.get("/", async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tags = await Tag.findAll({
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single tag by ID with associated product
router.get("/:id", async (req, res) => {
  try {
    // Find a single tag by its ID and include associated Product data
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"],
      },
    });
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ message: "No tag found with this ID" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST: Create a new tag
router.post("/", async (req, res) => {
  try {
    // Create a new tag with the provided tag_name
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT: Update a tag's name by its ID
router.put("/:id", async (req, res) => {
  try {
    // Update the tag's name by its ID
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedTag[0] === 1) {
      res.json({ message: "Tag updated successfully" });
    } else {
      res.status(404).json({ message: "No tag found with this ID" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE: Delete a tag by its ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete a tag by its ID
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedTag === 1) {
      res.json({ message: "Tag deleted successfully" });
    } else {
      res.status(404).json({ message: "No tag found with this ID" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
