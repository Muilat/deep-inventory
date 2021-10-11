import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  // class Item extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   // static associate(models) {
  //   //   // define association here
  //   // }
  // };
  
  // Item.init({
  //   name: DataTypes.STRING,
  //   validTill: DataTypes.STRING,
  //   quantity: DataTypes.NUMBER
  // }, {
  //   sequelize,
  //   modelName: 'Item',
  // });
  // return Item;

  const Item = sequelize.define('Item', {
    validTill: {
      type: TIMESTAMP,
      allowNull: false
  },
    quantity: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    createdAt:{
        type: TIMESTAMP,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updatedAt:{
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false
    }
  });

  return Item
};