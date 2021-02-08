'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('messages', 'userId',
    {
    type: 'integer',
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'}
    )
    .catch(err => console.log(err));

    await queryInterface.addColumn('messages', 'smokePlaceId',
    {
    type: 'integer',
    references: {
      model: 'smokePlaces',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'}
    )
    .catch(err => console.log(err));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('messages', 'userId');
    await queryInterface.removeColumn('messages', 'smokePlaceId');
  }
};
