
const express = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const app = express();

app.use(express.json());

app.use(celebrate({
  body: Joi.object({
  name: Joi.string().min(3).required()
 }).unknown()
}));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const games = [
  {
    id: 1,
    name: 'Grand Theft Auto V'
  },
  {
    id: 2,
    name: 'The Legend of Zelda: Breath of The Wild'
  },
  {
    id: 3,
    name: 'Tekken 7'
  },
  {
    id: 4,
    name: 'Super Smash Bros Ultimate'
  },
];

const users = [
  {
    id: 1,
    name: 'Mikko Rajala',
    rentedGame: ''
  },
  {
    id: 2,
    name: 'Konsta Saarinen',
    rentedGame: ''
  },
  {
    id: 3,
    name: 'Jarno Mäkelä',
    rentedGame: ''
  },
];


app.get('/', (req, res) => {
  res.send('Video Game Rental Store');
});

app.get('/api/games', (req, res) => {
  res.send(games);
});

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.get('/api/games/:id', (req, res) => {
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) return res.status(404).send('The game with the given ID was not found');
  res.send(game);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('The user with the given ID was not found');
  res.send(user);
});

app.post('/api/games', (req, res) => {
  const game = {
    id: games.length + 1,
    name: req.body.name
  };
  games.push(game);
  res.send(game);
});

app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    rentedGame: ''
  };
  users.push(user);
  res.send(user);
});

app.put('/api/games/:id', (req, res) => {
  //Look up the game
  //If not existing, return 404
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) return res.status(404).send('The game with the given ID was not found');
  //update game
  game.name = req.body.name;
  //return the updated game
  res.send(game);
});

app.put('/api/users/:id', (req, res) => {

  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('The user with the given ID was not found');

  user.name = req.body.name;
  user.rentedGame = req.body.rentedGame;

  res.send(user);
});

app.delete('/api/games/:id', (req, res) => {
  // Look up the game
  // Not existing, return 404
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) return res.status(404).send('The game with the given ID was not found');

  // Delete
  const index = games.indexOf(game);
  games.splice(index, 1);

  // Return the same game
  res.send(game);
});

app.delete('/api/users/:id', (req, res) => {

  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('The user with the given ID was not found');

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.send(user);
});
