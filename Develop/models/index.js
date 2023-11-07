const Product = require('./Product')
const Category = require('./Category')
const ProductTag = require('./ProductTag')
const Tag = require('./Tag')

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
