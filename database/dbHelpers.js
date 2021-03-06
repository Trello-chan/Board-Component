// import Sequelize from 'sequelize';
import SQL_connection from './index';
import { Board, Card, Card_Member, List, Member, Team, Comment } from './schema';

const getCardsHelper = ({ board_id }) => 
  SQL_connection.query(`select l.*, json_agg(c.*) as cards from lists l inner join cards c on c.list_id = l.id AND l.board_id = ${board_id} group by l.id;`)
  /* right now this returns
  [
    { //list 1
      cards:[
        { //card 1
          //TODO: need comment alias here in the form of an array
        }
      ]
    }
  ]
  */

const createListHelper = ({ name, column_index, board_id }) =>
  List.create({
    name,
    column_index,
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