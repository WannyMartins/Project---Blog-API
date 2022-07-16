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
    tableName: 'BlogPosts',
    createdAt: 'published',
    updatedAt: 'updated'
    // https://cursos.alura.com.br/forum/topico-renomear-as-colunas-createdat-e-updatedat-130933
  });

  BlogPost.associate = (db) => {
    BlogPost.belongsTo(db.User, { as: 'user', foreignKey: 'userId' })
  }


return BlogPost;
};

module.exports = createBlogPost;