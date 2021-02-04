'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('likeOrDislikes', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'likeOrDislikes_users_fk',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('likeOrDislikes', {
      fields: ['placeId'],
      type: 'foreign key',
      name: 'likeOrDislikes_smoke_fk',
      references: { //Required field
        table: 'smokePlaces',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('messages', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'messages_users_fk',
      references: { //Required field
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('messages', {
      fields: ['placeId'],
      type: 'foreign key',
      name: 'messages_smoke_fk',
      references: { //Required field
        table: 'smokePlaces',
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
    await queryInterface.removeConstraint('likeOrDislikes', 'likeOrDislikes_users_fk');
    await queryInterface.removeConstraint('likeOrDislikes', 'likeOrDislikes_smoke_fk');

    await queryInterface.removeConstraint('messages', 'messages_users_fk');
    await queryInterface.removeConstraint('messages', 'messages_smoke_fk');
  }
};
