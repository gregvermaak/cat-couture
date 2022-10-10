const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");

const queryParamsSchema = Joi.object().keys({
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1),
});

router.get(
  "/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      const defaultLimit = limit ? parseInt(limit) : 10;
      const defaultPage = parseInt(page) ? parseInt(page) : 1;

      const totalProducts = await productRepository.getTotalProducts();
      const products = await productRepository.getProducts(
        defaultLimit,
        defaultPage
      );

      const responseResults = {
        products,
        currentPage: defaultPage,
        totalPages: Math.ceil(parseInt(totalProducts.length) / defaultLimit),
        itemsPerPage: defaultLimit,
        totalItems: totalProducts.length,
      };

      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
