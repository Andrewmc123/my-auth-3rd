'use strict';

const { Spot, User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log(process.env.NODE_ENV)
  
  // create spots //
await Spot.bulkCreate([
  {
    ownerId: 2,
    address: "45 Redwood Trail",
    city: "Sedona",
    state: "Arizona",
    country: "USA",
    lat: 34.8697,
    lng: -111.7610,
    name: "Red Rock Retreat",
    description: "Nestled between iconic red rock formations, this retreat offers peace and inspiration. Stargaze from the deck or hike one of the many nearby trails. Perfect for writers, artists, and nature lovers alike.",
    price: 110
  },
  {
    ownerId: 3,
    address: "9 Harbor Point Rd",
    city: "Bar Harbor",
    state: "Maine",
    country: "USA",
    lat: 44.3876,
    lng: -68.2039,
    name: "Coastal Cottage",
    description: "Wake up to the sound of waves and seagulls. This charming cottage is a short walk to Acadia National Park and the perfect place to relax by the sea with a hot cup of coffee and fresh air.",
    price: 130
  },
  {
    ownerId: 1,
    address: "100 Meadow Way",
    city: "Bozeman",
    state: "Montana",
    country: "USA",
    lat: 45.6770,
    lng: -111.0429,
    name: "Meadow View Ranch",
    description: "Surrounded by rolling hills and wildflowers, this ranch-style home is the definition of calm. Watch wildlife from the porch and enjoy a fire pit under the wide-open sky.",
    price: 95
  },
  {
    ownerId: 2,
    address: "87 Pine Cone Ln",
    city: "Big Bear Lake",
    state: "California",
    country: "USA",
    lat: 34.2439,
    lng: -116.9114,
    name: "Cabin in the Pines",
    description: "Cozy up by the fireplace or hit the nearby slopes. This pine-covered cabin is perfect for a winter escape or summer lake fun. Don’t forget the s'mores!",
    price: 105
  },
  {
    ownerId: 3,
    address: "21 Prairie Wind Dr",
    city: "Amarillo",
    state: "Texas",
    country: "USA",
    lat: 35.221997,
    lng: -101.831297,
    name: "Prairie View Escape",
    description: "A peaceful stay overlooking golden fields as far as the eye can see. Sunrise coffee or sunset wine — this place is built for both. Perfect for digital detox or solo recharging.",
    price: 68
  },
  {
    ownerId: 1,
    address: "300 Lakeshore Blvd",
    city: "South Lake Tahoe",
    state: "California",
    country: "USA",
    lat: 38.9399,
    lng: -119.9772,
    name: "Tahoe Waterfront",
    description: "Step outside and your toes are in the sand. This lakefront gem offers paddleboarding, kayaking, or simply soaking in the view. The water is your front yard.",
    price: 140
  },
  {
    ownerId: 2,
    address: "12 Snowcap Summit",
    city: "Jackson",
    state: "Wyoming",
    country: "USA",
    lat: 43.4799,
    lng: -110.7624,
    name: "Alpine Lodge",
    description: "High up in the Tetons, this alpine lodge gives you sweeping mountain views and cozy interiors. Après ski by the fire or take a scenic tram ride up the peak.",
    price: 155
  },
  {
    ownerId: 3,
    address: "150 Mountain View Dr",
    city: "Asheville",
    state: "North Carolina",
    country: "USA",
    lat: 35.5951,
    lng: -82.5544,
    name: "Mountain Hideaway",
    description: "Escape to the Blue Ridge Mountains in this charming cabin. Surrounded by nature, this spot offers stunning views and peaceful seclusion. Perfect for a weekend getaway or longer stay.",
    price: 120
  },
], { validate: true });

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
