'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('order_of_services', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        client_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'clients', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        status_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'status', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        data_hora: {
          type: Sequelize.DATE,
          allowNull: false
        },
        descricao: {
          type: Sequelize.STRING,
          allowNull: false
        },
        observacao: {
          type: Sequelize.STRING,
          allowNull: false
        },
        ativo: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('order_of_services');
  }
};
