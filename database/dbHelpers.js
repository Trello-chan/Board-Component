// import Sequelize from 'sequelize';
import SQL_connection from './index';
import { Board, Card, Card_Member, List, Member, Team } from './schema';

const getCardsHelper = ({ board_id }) => 
  SQL_connection.query(`select l.*, json_agg(c.*) as cards from lists l inner join cards c on c.list_id = l.id AND l.board_id = ${board_id} group by l.id;`)
  // List.findAll({ 
  //   where: {
  //     board_id
  //   },
  //   include: {
  //     model: Card,
  //     as: 'cards',
  //     where: { list_id: {$col: 'List.id' }}
  //   }
  // });

const createListHelper = ({ name, board_id }) =>
  List.create({
    name,
    board_id
  })

const removeListHelper = ({ id }) =>
  List.destroy({ where: { id }})

const createCardHelper = ({ label, description, comment = '', list_id, list_index }) => 
  Card.create({ 
    label,
    description,
    comment,
    list_id,
    list_index
  });

const updateCardHelper = ({ id, update }) =>
  Card.update(
    update,
    { where: { id }}
  )

const removeCardHelper = (idObj) =>
  Card.destroy({ where: idObj})

const createCardMemberAssociation = ({ card_id, member_id }) =>
  SQL_connection.query(`insert into card_members ("card_id", "member_id") values (${card_id},${member_id})`)
  // Card_Member.findOrCreate({
  //   where: {card_id,
  //   member_id
  //   }
  // })

const removeCardMemberAssociation = ({ card_id, member_id }) =>
  Card_Member.destroy({ where: { card_id, member_id }});

// SQL_connection.query(`INSERT INTO card_members ("card_id", "member_id") VALUES (${card_id}, ${member_id})`)

export {
  getCardsHelper,
  createCardHelper,
  createListHelper,
  updateCardHelper,
  createCardMemberAssociation,
  removeCardMemberAssociation,
  removeListHelper,
  removeCardHelper
}