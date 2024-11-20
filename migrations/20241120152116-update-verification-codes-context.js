module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('VerificationCodes', 'context', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('VerificationCodes', 'context');
  },
};
