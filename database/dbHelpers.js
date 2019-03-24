// import Sequelize from 'sequelize';
// import SQL_connection from './index';
import { Board, Card, Card_Member, List, Member, Team } from './schema';

const getCardsHelper = ({ board_id }) => 
  List.findAll({ 
    where: {
      board_id
    },
    include: {
      model: Cards,
      as: 'cards',
      where: { list_id: {$col: 'List.id' }}
    }
  });

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
  Card_Member.create({
    card_id,
    member_id
  })

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