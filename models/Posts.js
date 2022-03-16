module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    //fields and columns of table 
    title:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    postText:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    username:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
  });

  Posts.associate = models => {
    Posts.hasMany(models.Comments,{
      onDelete: "cascade"
    })
  }
  return Posts
};
 