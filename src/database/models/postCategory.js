const createPostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', 
  {
    postId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true,
      references: {
        model: 'BlogPost',
        key: 'id',
      }
    },
    categoryId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Category',
        key: 'id',
     }
    },
  },
  { 
    tableName: 'PostCategory',
    timestamps: false,
  },
  )
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Category',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};

module.exports = createPostCategory;

// ModelDeAssociação.associate = (models) => {
//   models.ModelFonte.belongsToMany(models.ModelAlvo, {
//     as: 'apelido_da_associação',
//     through: ModelDeAssociação,
//     foreignKey: 'id_da_fonte_na_tabela_da_associação',
//     otherKey: 'id_do_alvo_na_tabela_da_associação',
//   });