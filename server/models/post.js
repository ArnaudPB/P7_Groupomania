'use strict';
const {
    Model
} = require('sequelize');

// const paranoid = require('paranoid')
// const timestamp = require('timestamp');
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Post.belongsTo(models.User, {
                    foreignKey: {
                        allowNull: false
                    },
                    onDelete: 'CASCADE',
                }),
                models.Post.hasMany(models.Comment)
            models.Post.hasMany(models.Like)

        }
    };
    Post.init({
        message: { type: DataTypes.TEXT, allowNull: false },
        link: { type: DataTypes.STRING, allowNull: true },
        imageUrl: { type: DataTypes.STRING, allowNull: true },

        // deleteAt: { type: Sequelize.DATE }


    }, {
        sequelize,
        modelName: 'Post',

        //paranoid: true

        // timestamp: true
    });
    return Post;
};