'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //await queryInterface.addColumn('smokePlaces', 'userId', Sequelize.INTEGER);
    await queryInterface.addConstraint('smokePlaces', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('smokePlaces', 'fk');
    await queryInterface.removeColumn('smokePlaces', 'userId');
  }
};
