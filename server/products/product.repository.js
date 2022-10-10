const db = require("../db");

const getTotalProductsSQL = `SELECT
p.id,
p.name,
p.description,
p.price,
pc.name AS "categoryName",
pi.name AS "imageName",
pi.description AS "imageDescription",
dt.type AS "discountType",
pd.value AS "discountValue"
FROM product p
LEFT JOIN product_category pc ON p.product_category_id = pc.id
LEFT JOIN product_image pi ON p.product_image_id = pi.id
LEFT JOIN product_discount pd ON p.id = pd.product_id
LEFT JOIN discount_type dt ON pd.discount_type_id = dt.id
ORDER BY 
p.id
`;

const getProductsSQL = `SELECT
p.id,
p.name,
p.description,
p.price,
pc.name AS "categoryName",
pi.name AS "imageName",
pi.description AS "imageDescription",
dt.type AS "discountType",
pd.value AS "discountValue"
FROM product p
LEFT JOIN product_category pc ON p.product_category_id = pc.id
LEFT JOIN product_image pi ON p.product_image_id = pi.id
LEFT JOIN product_discount pd ON p.id = pd.product_id
LEFT JOIN discount_type dt ON pd.discount_type_id = dt.id
ORDER BY 
p.id
LIMIT $1 OFFSET $2
`;

module.exports = {
  getTotalProducts: async () => {
    try {
      const result = await db.query(getTotalProductsSQL);
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
  getProducts: async (limit, page) => {
    try {
      if (page <= 0 || !page) {
        throw new Error(`invalid input syntax for type bigint: NaN`);
      }
      const offset = limit * (page - 1);
      const result = await db.query(getProductsSQL, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
};
