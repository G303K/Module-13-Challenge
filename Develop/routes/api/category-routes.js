const router = require("express").Router();
const { Category, Product } = require("../../models");

// Function to handle errors
const handleErrors = (res, error) => {
  console.log(error);
  res.status(500).json(error);
};

// Get all categories with associated products
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });

    if (categories.length === 0) {
      res.status(404).json({ message: "No categories found" });
    } else {
      res.json(categories);
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

// Get a category by its id with associated products
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });

    if (!category) {
      res.status(404).json({ message: "No category found with this id" });
    } else {
      res.json(category);
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });

    res.json(newCategory);
  } catch (error) {
    handleErrors(res, error);
  }
});

// Update a category by its id
router.put("/:id", async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: "No category found with this id" });
    } else {
      res.json(updatedCategory);
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

// Delete a category by its id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedCategory === 0) {
      res.status(404).json({ message: "No category found with this id" });
    } else {
      res.json(deletedCategory);
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

module.exports = router;
