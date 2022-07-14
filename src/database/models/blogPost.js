const createBlogPost = (sequelize, Sequelize) => {
  const BlogPost = sequelize.define('BlogPost', 
  {
    id: { 
      type: Sequelize.INTEGER, allowNull: false, autoIncrement: true,primaryKey: true
    },
    title: Sequelize.STRING,
    content:Sequelize.STRING,
    userId: Sequelize.INTEGER,
    published: Sequelize.DATE,
    updated: Sequelize.DATE,
  }, 
  {
    tableName: 'BlogPost',
  });

  BlogPost.associate = (db) => {
    BlogPost.belongsTo(db.User, { as: 'Users', foreignKey: 'userId' })
  }


return BlogPost;
};

module.exports = createBlogPost;