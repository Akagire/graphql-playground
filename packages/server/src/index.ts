import express, { Response, NextFunction } from 'express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for debugging
app.use((_, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.listen(3001, () => {
  console.log('Express server start on port 3001.');
});

app.get('/', (_, res: Response) => {
  res.send({
    status: 'OK',
  });
});

app.get('/test', (_, res: Response) => {
  res.send({
    status: 'vvv',
  });
});
