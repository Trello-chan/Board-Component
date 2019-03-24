import Sequelize from 'sequelize';
import SQL_connection from './index';

const Member = SQL_connection.define('member', {
  name: Sequelize.STRING
});

const Team = SQL_connection.define('team', {
  teamname: Sequelize.STRING //don't really need other fields for a mock module
});

const Board = SQL_connection.define('board', {
  title: Sequelize.STRING,
  team_id: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'teams', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE'},
  background_image: { type: Sequelize.STRING, allowNull: true }
});

const List = SQL_connection.define('list', {
  name: Sequelize.STRING,
  board_id: { type: Sequelize.INTEGER, references: { model: 'boards', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE'}
})

// List.hasMany(Card);

const Card = SQL_connection.define('card', {
  label: Sequelize.STRING,
  description: Sequelize.STRING,
  comment: Sequelize.STRING,
  list_index: { type: Sequelize.INTEGER, allowNull: false },
  // list_id: { type: Sequelize.INTEGER, references: { model: 'lists', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE'}
});

Card.belongsTo(List, { foreignKey: 'list_id' });

const Card_Member = SQL_connection.define('card_member', {});

Card.belongsToMany(Member, { through: 'card_members', foreignKey: 'card_id' });
Member.belongsToMany(Card, { through: 'card_members', foreignKey: 'member_id' });

SQL_connection.sync();

export {
  Board,
  Card,
  Card_Member,
  List,
  Member,
  Team
}