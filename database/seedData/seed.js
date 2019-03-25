import path from 'path'
import SQL_connection from '../index';
import {   
  Board,
  Card,
  Card_Member,
  List,
  Member,
  Team
} from '../schema';

const seedData = async () => {
  await SQL_connection.sync({ force: true })
    .then( async () => {
      console.log('db synced')
      //clean out all tables (order is important)
      let start = new Date();
      await Card_Member.truncate({ restartIdentity: true, cascade: true });
      await Team.truncate({ restartIdentity: true, cascade: true });
      await List.truncate({ restartIdentity: true, cascade: true });
      await Card.truncate({ restartIdentity: true, cascade: true });
      await Board.truncate({ restartIdentity: true, cascade: true });
      await Member.truncate({ restartIdentity: true, cascade: true });
      let end = new Date();
      await console.log(`deleting data from tables took ${Math.floor((end - start)/1000)} seconds`);  
    })
    // .then( async () => {
    //   let start = new Date();
    //   console.log('dropping constraints to improve seeding speed')
    //   await SQL_connection.query(`ALTER TABLE users DROP CONSTRAINT IF EXISTS "users_pkey" CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE users DROP CONSTRAINT IF EXISTS "users_username_key"`);
    //   await SQL_connection.query(`ALTER TABLE games DROP CONSTRAINT IF EXISTS "games_pkey" CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE games DROP CONSTRAINT IF EXISTS "games_title_key"`);
    //   await SQL_connection.query(`ALTER TABLE friends DROP CONSTRAINT IF EXISTS "friends_pkey"`);
    //   await SQL_connection.query(`ALTER TABLE friends DROP CONSTRAINT IF EXISTS "friends_userId_friendId_key"`);
    //   await SQL_connection.query(`ALTER TABLE friend_requests DROP CONSTRAINT IF EXISTS "friend_requests_pkey"`);
    //   await SQL_connection.query(`ALTER TABLE friend_requests DROP CONSTRAINT IF EXISTS "friend_requests_friendId_userId_key"`);
    //   await SQL_connection.query(`ALTER TABLE confirmations DROP CONSTRAINT IF EXISTS "confirmations_pkey" CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE user_confirmations DROP CONSTRAINT IF EXISTS "user_confirmations_pkey"`);
    //   await SQL_connection.query(`ALTER TABLE histories DROP CONSTRAINT IF EXISTS "histories_pkey" CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE user_histories DROP CONSTRAINT IF EXISTS "user_histories_pkey"`);
    //   let end = new Date();
    //   await console.log(`dropping constraints took ${Math.floor((end - start)/1000)} seconds`);
    // })
    .then( async () => {
      let start = new Date();
      await SQL_connection.query(`COPY members ("name") FROM '${path.join(__dirname, './data/users.csv')}' CSV`);
      await console.log('copied members');
      await SQL_connection.query(`COPY teams ("teamname") FROM '${path.join(__dirname, '/data/teams.csv')}' CSV`);
      await console.log('copied teams');
      await SQL_connection.query(`COPY boards ("title", "team_id", "background_image") FROM '${path.join(__dirname, './data/boards.csv')}' DELIMITER '\t' NULL AS 'null' CSV`);
      await console.log('copied boards')
      await SQL_connection.query(`COPY lists ("name", "column_index", "board_id") FROM '${path.join(__dirname, './data/lists.csv')}' DELIMITER '\t' NULL AS 'null' CSV`);
      await console.log('copied lists')
      await SQL_connection.query(`COPY cards ("label", "description", "list_id", "list_index") FROM '${path.join(__dirname, './data/cards.csv')}' DELIMITER '\t' CSV`);
      await console.log('copied cards');
      await SQL_connection.query(`COPY card_members ("card_id", "member_id") FROM '${path.join(__dirname, './data/cardMembers.csv')}' DELIMITER '\t' CSV`);
      let end = new Date();
      await console.log(`seeding data took ${Math.floor(((end - start)/1000)/60)} minutes`);
      await process.exit();
    })
    // .then( async ()=>{
    //   let start = new Date();
    //   await SQL_connection.query(`ALTER TABLE users ADD CONSTRAINT "users_pkey" PRIMARY KEY (id)`);
    //   await SQL_connection.query(`ALTER TABLE users ADD CONSTRAINT "users_username_key" UNIQUE (username)`);
    //   await SQL_connection.query(`ALTER TABLE games ADD CONSTRAINT "games_pkey" PRIMARY KEY (id)`);
    //   await SQL_connection.query(`ALTER TABLE games ADD CONSTRAINT "game_title_key" UNIQUE (title)`);

    //   await SQL_connection.query(`ALTER TABLE friends ADD CONSTRAINT "friends_pkey" PRIMARY KEY (id)`);
    //   await SQL_connection.query(`ALTER TABLE friends ADD CONSTRAINT "friends_userId_friendId_key" UNIQUE ("userId", "friendId")`);
    //   await SQL_connection.query(`ALTER TABLE friends ADD FOREIGN KEY ("friendId") REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE friends ADD FOREIGN KEY ("userId") REFERENCES users ON UPDATE CASCADE ON DELETE CASCADE`);
      
    //   await SQL_connection.query(`ALTER TABLE friend_requests ADD CONSTRAINT "friend_requests_pkey" PRIMARY KEY (id)`);
    //   await SQL_connection.query(`ALTER TABLE friend_requests ADD CONSTRAINT "friend_requests_friendId_userId_key" UNIQUE ("friendId", "userId")`);
    //   await SQL_connection.query(`ALTER TABLE friend_requests ADD FOREIGN KEY ("friendId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE friend_requests ADD FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE`);

    //   await SQL_connection.query(`ALTER TABLE confirmations ADD CONSTRAINT "confirmations_pkey" PRIMARY KEY (id)`);
    //   await SQL_connection.query(`ALTER TABLE confirmations ADD FOREIGN KEY ("gameId") REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE user_confirmations ADD CONSTRAINT "user_confirmations_pkey" PRIMARY KEY ("userId", "confirmationId")`);
    //   await SQL_connection.query(`ALTER TABLE user_confirmations ADD FOREIGN KEY ("confirmationId") REFERENCES confirmations(id) ON UPDATE CASCADE ON DELETE CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE user_confirmations ADD FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE`);

    //   await SQL_connection.query(`ALTER TABLE histories ADD CONSTRAINT "histories_pkey" PRIMARY KEY (id)`);
    //   await SQL_connection.query(`ALTER TABLE histories ADD FOREIGN KEY ("gameId") REFERENCES games(id) ON UPDATE CASCADE ON DELETE CASCADE`);
    //   await SQL_connection.query(`ALTER TABLE user_histories ADD CONSTRAINT "user_histories_pkey" PRIMARY KEY (id)`);
    //   await SQL_connection.query(`ALTER TABLE user_histories ADD FOREIGN KEY ("historyId") REFERENCES histories(id) ON UPDATE CASCADE ON DELETE SET NULL`);
    //   await SQL_connection.query(`ALTER TABLE user_histories ADD FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL`);
    //   let end = new Date();
    //   await console.log(`adding constraints took ${Math.floor((end - start)/1000)} seconds`);
    //   await process.exit();
    // })
    .catch((err) => console.log('error syncing database: ', err));
};

seedData();