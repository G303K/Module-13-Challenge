// Import Sequelize and create an instance of it
const Sequelize = require('sequelize');
const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql' // Change this to your database type
});

// Define your models
const Product = sequelize.define('Product', {
  // Define Product model attributes here
});

const Category = sequelize.define('Category', {
  // Define Category model attributes here
});

const Tag = sequelize.define('Tag', {
  // Define Tag model attributes here
});

const ProductTag = sequelize.define('ProductTag', {
  // Define ProductTag model attributes here
});

// Define associations
Product.belongsTo(Category);
Category.hasMany(Product);

Product.belongsToMany(Tag, { through: ProductTag });
Tag.belongsToMany(Product, { through: ProductTag });

// Export the models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
