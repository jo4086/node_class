'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('orderItems', 'price', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0, // 기존 데이터 처리 필요 시 기본값 설정
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('orderItems', 'price')
    },
}
