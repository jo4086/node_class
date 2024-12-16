const Sequelize = require('sequelize')

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    // 글 내용
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                img: {
                    // 이미지 경로가 저장되는 컬럼
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Post',
                tableName: 'posts',
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            },
        )
    }

    static associate(db) {
        db.Post.belongsTo(db.User)
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
    }
}
