'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('employees', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        },
        telefone: {
          type: Sequelize.STRING,
          allowNull: true
        },
        celular: {
          type: Sequelize.STRING,
          allowNull: false
        },
        logradouro: {
          type: Sequelize.STRING,
          allowNull: true
        },
        numero: {
          type: Sequelize.STRING,
          allowNull: true
        },
        complemento: {
          type: Sequelize.STRING,
          allowNull: true
        },
        bairro: {
          type: Sequelize.STRING,
          allowNull: true
        },
        cep: {
          type: Sequelize.STRING,
          allowNull: true
        },
        cidade: {
          type: Sequelize.STRING,
          allowNull: true
        },
        estado: {
          type: Sequelize.STRING,
          allowNull: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true
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
      return queryInterface.dropTable('employees');
  }
};
