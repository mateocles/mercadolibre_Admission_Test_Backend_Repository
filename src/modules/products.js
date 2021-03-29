"use strict";
const axios = require("axios");

class products {
  static async getSearchProducts(search) {
    const { data } = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=:${search}`
    );
    let items = [];
    let author = { name: "mateo", lastname: "ceballos" };
    let categories = ["item1", "item2", "item3"];
    for (const item of data.results) {
      items.push({
        id: item.id,
        title: item.title,
        price: { amount: item.prices.amount },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      });
    }
    return { data: { author, categories, items } };
  }
  static async getIdProducts(id) {
    try {
      const { data } = await axios.get(
        `https://api.mercadolibre.com/items/${id}`
      );
      const description = await axios.get(
        `https://api.mercadolibre.com/items/${id}/descriptions`
      );

      let product = {
        id: data.id,
        title: data.title,
        price: data.price,
        pictures: data.pictures,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: description.data[0].plain_text,
      };
      let author = { name: "mateo", lastname: "ceballos" };
      return {
        data: { author, item: product },
      };
    } catch (error) {
      console.log(error.me);
    }
  }
}

module.exports = products;
