const express = require("express");
const {
  checkJwt,
  checkScopes,
} = require("../middleware/authorizationMiddleware");
const router = express.Router();
const reportRepository = require("./report.repository");

router.get("/", checkJwt, checkScopes, async (req, res, next) => {
  try {
    const categoryReport = await reportRepository.getCategoryReport();
    const discountReport = await reportRepository.getDiscountReport();

    const response = {
      categoryReport,
      discountReport,
    };

    return res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
