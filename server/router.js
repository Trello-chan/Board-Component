import express from 'express';
import {
  getCards,
  createCard,
  createList,
  updateCard,
  linkCardMember,
  unlinkCardMember,
  removeList,
  removeCard
} from './controller';

const router = express.Router();

router.route('/cards')
  .get(getCards)
  .post(createCard)
  .patch(updateCard)
  .delete(removeCard);

router.route('/card-member')
  .post(linkCardMember)
  .delete(unlinkCardMember);

router.route('/list')
  .post(createList)
  .delete(removeList)

export default router;