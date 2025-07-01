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
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
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
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
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
        url: 'https://images.unsplash.com/photo-1505028118505-266749351347?w=1280',
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
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1280',
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
