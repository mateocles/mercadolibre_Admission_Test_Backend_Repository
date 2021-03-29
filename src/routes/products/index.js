"use strict";
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { getSearchProducts, getIdProducts } = require("../../modules/products");

router.get("/api/items", async (request, response) => {
  const { data } = await getSearchProducts(request.query.q);
  return response.send({ data });
});
router.get("/api/items/:id", async (request, response) => {
  const data = await getIdProducts(request.params.id);
  return response.send({ data });
});

module.exports = router;
