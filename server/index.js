import express from 'express';
import path from 'path';
import parser from 'body-parser';
import cors from 'cors';

import router from './router';

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/board-api', router)

// app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

if (process.env.NODE_ENV !== 'jest') {
  app.listen(port, () => console.log(`server is listening on port ${port}`));
}


export default app;