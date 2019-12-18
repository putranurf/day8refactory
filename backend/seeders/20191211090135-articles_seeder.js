'use strict';

const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const article = []
    faker.locale = 'id_ID'
    for (let i = 0; i < 100; i++) {
      article.push({
        judul: faker.company.companyName(),
        author: faker.name.findName(),
        user_id: faker.random.number({
            'min': 1701,
            'max': 1800
        }),
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    return queryInterface.bulkInsert('article', article, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
