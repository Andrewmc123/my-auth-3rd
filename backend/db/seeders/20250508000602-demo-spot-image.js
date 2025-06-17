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
      // Lake Cabin (Wasilla, Alaska) - Living Room
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: true,
      },
      // Living Room Interior
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1280',
        preview: false,
      },
      // Bedroom Interior
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1522708323569-d613b698804f?w=1280',
        preview: false,
      },
      // Kitchen Interior
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: false,
      },
      // Bathroom Interior
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=1280',
        preview: false,
      },
      // Backyard
      {
        spotId: 1,
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280',
        preview: false,
      },

      // Winery Getaway (Sonoma, California)
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1280',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1522708323569-d613b698804f?w=1280',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=1280',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280',
        preview: false,
      },

      // Downtown Hidden Gem (Denver, Colorado)
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1280',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1522708323569-d613b698804f?w=1280',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=1280',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280',
        preview: false,
      },

      // Modern Loft (Portland, Oregon)
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1280',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1522708323569-d613b698804f?w=1280',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=1280',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280',
        preview: false,
      },

      // Mountain Retreat (Aspen, Colorado)
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1280',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1522708323569-d613b698804f?w=1280',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=1280',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280',
        preview: false,
      },

      // Beach House (Miami, Florida)
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1280',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1522708323569-d613b698804f?w=1280',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=1280',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280',
        preview: false,
      },
      // Interior Room - Unsplash
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: false
      },
      // Kitchen - Pixabay
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2018/01/29/12/09/room-3116324_1280.jpg',
        preview: false
      },
      // Bathroom - Pexels
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/1106008/pexels-photo-1106008.jpeg?auto=compress&cs=tinysrgb&w=1280',
        preview: false
      },

      // Beautiful Budapest (Hungary)
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1280',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1522708323569-d613b698804f?w=1280',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1558478551-1a378f63328e?w=1280',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280',
        preview: false,
      },
      // Backyard - Unsplash
      {
        spotId: 6,
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1280',
        preview: false
      },
      // Amenities - Pixabay
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2016/03/27/19/49/backyard-1284157_1280.jpg',
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImage', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
