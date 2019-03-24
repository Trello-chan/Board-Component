import fs from 'fs';
import faker from 'faker';

const relativePath = './database/seedData/data/';

const userDir = fs.createWriteStream(relativePath + 'users.csv');
const teamDir = fs.createWriteStream(relativePath + 'teams.csv');
const boardDir = fs.createWriteStream(relativePath + 'boards.csv');
const listDir = fs.createWriteStream(relativePath + 'lists.csv');
const cardDir = fs.createWriteStream(relativePath + 'cards.csv');
const cardMemberDir = fs.createWriteStream(relativePath + 'cardMembers.csv');

const entries = 100;

const createUsers = () => {
  console.log('starting createUsers')
  let users = '';
  for (let i = 0; i < entries; i++) {
    let username = faker.name.firstName();
    users += `${username}\n`;
  }
  userDir.write(users);
  console.log('ending createUsers')
}

const createTeams = () => {
  console.log('starting createTeams')
  let teams = '';
  for (let i = 0; i < entries; i++) {
    let group = faker.random.word();
    teams += `${group}\n`;
  }
  teamDir.write(teams);
  console.log('ending createTeams')
} 

const createBoards = () => {
  console.log('starting createBoards')
  let boards = '';
  for (let i = 0; i < entries; i++) {
    let title = faker.random.word();
    let randomTeamId = null;
    let randomBackground = null;
    if (Math.random() > 0.5) {
      randomTeamId = Math.ceil(Math.random() * entries/4);
    } 
    if (Math.random() > 0.5) {
      randomBackground = faker.image.image();
    } 
    boards += `${title}\t${randomTeamId}\t${randomBackground}\n`;
  }
  boardDir.write(boards);
  console.log('ending createBoards')
}

//for each board (entries) generate 1-5 lists
const createLists = () => { //so this should create id's 4 at a time, entries * 4
  let lists = '';
  for (let i = 0; i < entries; i++) {  //each entry is a board
    lists += `Todo\t${i+1}\nIn Progress\t${i+1}\nCompleted\t${i+1}\nBlockers\t${i+1}\n`;
  }
  listDir.write(lists);
}

//for each list, give it like 1-5 cards
let totalNumCards = 0;

const createCards = () => {
  console.log('starting createCards')
  let currentListId = 1;
  let cards = '';

  while (currentListId < (entries * 4)) {
    let numberOfCardsToMake = Math.ceil(Math.random() * 5);
    
    for (let i = 0; i < numberOfCardsToMake; i++) {
      let cardLabel = faker.random.words();
      let cardDescription = faker.random.words();
      let cardComment = faker.random.words();
      let list_id = currentListId;
      let list_index = i;
      cards += `${cardLabel}\t${cardDescription}\t${cardComment}\t${list_id}\t${list_index}\n`;
      totalNumCards += 1;
    }
    currentListId += 1;
  }
  cardDir.write(cards);
  console.log('ending createCards')
}

const createCardMemberAssociation = () => {
  console.log('starting createCardMember')
  let cardMember = '';
  //for each card
  for (let i = 1; i < totalNumCards + 1; i++) {
    //determine if we should assign a member
    if (Math.random() > 0.5) {
      let memberId = Math.ceil(Math.random() * entries);
      cardMember += `${i}\t${memberId}\n`;
    } 
  }
  cardMemberDir.write(cardMember);
  console.log('ending createCardMember')
}

const createSeedData = () => {
  createUsers();
  createTeams();
  createBoards();
  createLists();
  createCards();
  createCardMemberAssociation();
}

createSeedData();