'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('likeOrDislikes', 'userId',
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

    await queryInterface.addColumn('likeOrDislikes', 'smokePlaceId',
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
    await queryInterface.removeColumn('likeOrDislikes', 'userId');
    await queryInterface.removeColumn('likeOrDislikes', 'smokePlaceId');
  }
};
// 'use strict';
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('likeOrDislikes', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       userId: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'users', key: 'id'
//         }
//       },
//       placeId: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'smokePlaces', key: 'id'
//         }
//       },
//       isLike: {
//         type: Sequelize.INTEGER
//       },
//       isDislike: {
//         type: Sequelize.INTEGER
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('likeOrDislikes');
//   }
// };