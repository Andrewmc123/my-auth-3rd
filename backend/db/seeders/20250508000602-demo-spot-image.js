'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      // Spot 1
      {
        spotId: 1,
        url: '/spot1img.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: '/spot1bed.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: '/spot1kit.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: '/spot1bath.jpg',
        preview: false,
      },

      // Spot 2
      {
        spotId: 2,
        url: '/spot2img.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: '/spot2bed.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: '/spot2kit.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: '/spot2bath.jpg',
        preview: false,
      },

      // Spot 3
      {
        spotId: 3,
        url: '/spot3img.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: '/spot3bed.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: '/spot3kit.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: '/spot3bath.jpg',
        preview: false,
      },

      // Spot 4
      {
        spotId: 4,
        url: '/spot4img.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: '/spot4bed.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: '/spot4kit.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: '/spot4bath.jpg',
        preview: false,
      },

      // Spot 5
      {
        spotId: 5,
        url: '/spot5img.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: '/spot5bed.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: '/spot5kit.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: '/spot5bath.jpg',
        preview: false,
      },

      // Spot 6
      {
        spotId: 6,
        url: '/spot6img.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: '/spot6bed.jpg',
        preview: false,
      },
      {
        spotId: 6,
        url: '/spot6kit.jpg',
        preview: false,
      },
      {
        spotId: 6,
        url: '/spot6bath.jpg',
        preview: false,
      },

      // Spot 7
      {
        spotId: 7,
        url: '/spot7img.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: '/spot7bed.jpg',
        preview: false,
      },
      {
        spotId: 7,
        url: '/spot7kit.jpg',
        preview: false,
      },
      {
        spotId: 7,
        url: '/spot7bath.jpg',
        preview: false,
      },

      // Spot 8
      {
        spotId: 8,
        url: '/spot4img.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: '/spot4bed.jpg',
        preview: false,
      },
      {
        spotId: 8,
        url: '/spot4kit.jpg',
        preview: false,
      },
      {
        spotId: 8,
        url: '/spot4bath.jpg',
        preview: false,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImage', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
