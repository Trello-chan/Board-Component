import {
  getCardsHelper,
  createCardHelper,
  createListHelper,
  updateCardHelper,
  createCardMemberAssociation,
  removeCardMemberAssociation,
  removeListHelper,
  removeCardHelper
} from '../database/dbHelpers';

const errorHander = (err, res) => {
  console.error(err);
  res.status(404).send('Error');
}

const getCards = (req, res) => {
  getCardsHelper(req.query)
    .then(([listsAndCards]) => {
      let lists = {};
      let columns = new Array(listsAndCards.length);
      for (let list of listsAndCards) {
        columns[list.column_index] = list.id;
        lists[list.id] = list;
        list.cards.sort((a,b) => a.list_index - b.list_index);
      }
      res.status(200).send({ lists, columns });
    })
    .catch(err => errorHander(err, res));
};
  
const createCard = (req, res) => {
  createCardHelper(req.body)
    .then(() => res.status(201).send('success'))
    .catch(err => errorHander(err, res));
};
const createList = (req, res) => {
  createListHelper(req.body)
    .then(() => res.status(201).send('success'))
    .catch(err => errorHander(err, res));
};

const updateCard = (req, res) => {
  updateCardHelper(req.body)  //is this on req.body?  PUT request
    .then(() => res.status(201).send('success'))
    .catch(err => errorHander(err, res));
};

const linkCardMember = (req, res) => {
  createCardMemberAssociation(req.body)
    .then(() => res.status(201).send('success'))
    .catch(err => errorHander(err, res));
};

const unlinkCardMember = (req, res) => {
  removeCardMemberAssociation(req.body)
    .then(() => res.status(201).send('success'))
    .catch(err => errorHander(err, res));
};

const removeList = (req, res) => {
  //should destroy all related cards
  removeListHelper(req.body)
    .then(() => removeCardHelper({ list_id: req.body.id }))
    .then(() => res.status(201).send('success'))
    .catch(err => errorHander(err, res));

}

const removeCard = (req, res) => {
  removeCardHelper({ id: req.body.id })
    .then(() => res.status(201).send('success'))
    .catch(err => errorHander(err, res));
}

export {
  getCards,
  createCard,
  createList,
  updateCard,
  linkCardMember,
  unlinkCardMember,
  removeList,
  removeCard
}