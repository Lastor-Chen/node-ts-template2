import express from 'express';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express + TS + ts-node');
});

app.listen(3000, () => {
  console.log('server started');
});

// ts feature test
type SomeENV = string
const someEnv: SomeENV = process.env.SOME_ENV || ''
console.log('SOME_ENV', someEnv);
