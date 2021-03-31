"use strict";
const axios = require("axios");

class products {
  static async getSearchProducts(search) {
    try {
      const { data } = await axios.get(
        `https://api.mercadolibre.com/sites/MLA/search?q=:${search}`
      );
      const items = [];
      const author = { name: "mateo", lastname: "ceballos" };
      const categories = []
      const categoryFilters = data.filters.find(filter => filter.id === 'category')
      if (categoryFilters) {
        for (const filter of categoryFilters.values) {
          categories.push(filter.name)
        }
      }
      for (const item of data.results) {
        items.push({
          id: item.id,
          title: item.title,
          price: { currency: item.prices.prices[0].currency_id, amount: item.prices.prices[0].amount, decimals: item.prices.prices[0].amount % 1 },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
        });
      }
      return { data: { author, categories, items } };
    } catch (error) {
      return {
        message: `error ${error}`,
      };
    }
  }
  static async getIdProduct(id) {
    try {
      const { data } = await axios.get(
        `https://api.mercadolibre.com/items/${id}`
      );
      const description = await axios.get(
        `https://api.mercadolibre.com/items/${id}/descriptions`
      );

      const product = {
        id: data.id,
        title: data.title,
        price: data.price,
        pictures: data.pictures,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: description.data[0].plain_text,
      };
      const author = { name: "mateo", lastname: "ceballos" };
      return {
        data: { author, item: product },
      };
    } catch (error) {
      return {
        message: `error ${error}`,
      };
    }
  }
}

module.exports = products;
