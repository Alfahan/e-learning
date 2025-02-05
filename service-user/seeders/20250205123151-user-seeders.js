'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Mohamad Ali Farhan',
        profession: 'Software Architecture',
        roles: 'admin',
        email: 'ali.farhan160@gmail.com',
        password: await bcrypt.hash('rahasia1234', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Dyaksa D',
        profession: 'Backend Developer',
        roles: 'student',
        email: 'dyaksa@yopmail.com',
        password: await bcrypt.hash('rahasiady1234', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cep Guna Widodo',
        profession: 'Frontend Developer',
        roles: 'student',
        email: 'cep@yopmail.com',
        password: await bcrypt.hash('rahasiacep1234', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
