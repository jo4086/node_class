const Sequelize = require('sequelize')

module.exports = class Order extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            orderNumber: {
               type: Sequelize.STRING(50),
               allowNull: false,
               unique: true,
            },
            totalPrice: {
               type: Sequelize.INTEGER,
               allowNull: false,
            },
            status: {
               type: Sequelize.STRING(20),
               allowNull: false,
               defaultValue: 'pending',
            },
            CustomerId: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: 'customers',
                  key: 'id',
               },
               onDelete: 'CASCADE',
               onUpdate: 'CASCADE',
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Order',
            tableName: 'orders',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         },
      )
   }

   static associate(db) {
      db.Order.belongsTo(db.Customer, {
         foreignKey: 'CustomerId',
         targetKey: 'id',
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
      })
   }
}
