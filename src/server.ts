import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

import express from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';
import { sample_foods, sample_tags, sample_users } from './data';

import jwt from 'jsonwebtoken';
dbConnect();

const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200'],
  })
);

app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// app.get('/api/foods', (req, res) => {
//   res.send(sample_foods);
// });

// app.get('/api/foods/search/:searchTerm', (req, res) => {
//   const searchTerm = req.params.searchTerm;
//   const foods = sample_foods.filter((food) =>
//     food.name
//       .toLocaleLowerCase()
//       .includes(searchTerm.trim().toLocaleLowerCase())
//   );
//   res.send(foods);
// });

// app.get('/api/foods/tags', (req, res) => {
//   res.send(sample_tags);
// });

// app.get('/api/foods/tags/:tagName', (req, res) => {
//   const tagName = req.params.tagName.trim();
//   const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
//   res.send(foods);
// });

// app.get('/api/foods/:foodId', (req, res) => {
//   const foodId = req.params.foodId;
//   const foods = sample_foods.find((food) => food.id === foodId);
//   res.send(foods);
// });

// app.post('/api/users/login', (req, res) => {
//   const { email, password } = req.body;
//   const user = sample_users.find(
//     (user) => user.email === email && user.password === password
//   );

//   if (user) {
//     res.send(generateTokenResponse(user));
//   } else {
//     res.status(400).send('User email or password is not valid');
//   }
// });

// const generateTokenResponse = (user: any) => {
//   const token = jwt.sign(
//     { email: user.email, isAdmin: user.isAdmin },
//     'SomeRandomText',
//     {
//       expiresIn: '30d',
//     }
//   );
//   user.token = token;
//   return user;
// };

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Website served on http://localhost:' + port);
});
