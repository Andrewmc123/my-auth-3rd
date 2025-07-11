'use strict';
const { ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      // Review 1 (Lake Cabin, Alaska) - Front Yard
      {
        reviewId: 1,
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1280',
      },
      // Review 2 (Winery, California) - Front Yard
      {
        reviewId: 2,
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1280',
      },
      // Review 3 (Denver) - Front Yard
      {
        reviewId: 3,
        url: 'https://negativespace.co/wp-content/uploads/2018/01/001.jpg',
      },
      // Review 4 (Aspen) - Front Yard
      {
        reviewId: 4,
        url: 'https://negativespace.co/wp-content/uploads/2018/01/002.jpg',
      },
      // Review 5 (Austin) - Front Yard
      {
        reviewId: 5,
        url: 'https://negativespace.co/wp-content/uploads/2018/01/003.jpg',
      },
      // Review 6 (Lake Cabin) - Front Yard
      {
        reviewId: 6,
        url: 'https://negativespace.co/wp-content/uploads/2018/01/004.jpg'
      },
      // Review 7 (Budapest) - Front Yard
      {
        reviewId: 7,
        url: 'https://negativespace.co/wp-content/uploads/2018/01/005.jpg'
      },
      {
        reviewId: 8,
        url: '/spot8img.jpg'
      },
    
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8,] }
    }, {});
  }
};