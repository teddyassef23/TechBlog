const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');
// const sequelize = require('./../config/connection');

User.hasMany(Blog, {
  foreignKey: 'userId',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
});

Blog.hasMany(Comment, {
  foreignKey: 'blogId',
});


module.exports = { User, Blog, Comment };
