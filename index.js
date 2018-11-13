const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const games = [
  {id: 1, name: 'Grand Theft Auto V'},
  {id: 2, name: 'The Legend of Zelda Breath of The Wild'},
  {id: 3, name: 'Tekken 7'},
];

function validateGame(game) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(game, schema);
}

app.get('/', (req, res) => {
  res.send('Video Game Rental Store');
});

app.get('/api/games', (req, res) => {
  res.send(games);
});

app.get('/api/games/:id', (req, res) => {
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) return res.status(404).send('The game with the given ID was not found');
  res.send(game);
});

app.post('/api/games', (req, res) => {
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const game = {
    id: games.length + 1,
    name: req.body.name
  };
  games.push(game);
  res.send(game);
});

app.put('/api/games/:id', (req, res) => {
  //Look up the game
  //If not existing, return 404
  const game = games.find(c => c.id === parseInt(req.params.id));
  if (!game) return res.status(404).send('The game with the given ID was not found');

  //validate
  //If invalid return 400 - Bad request
  const { error } = validateGame(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update game
  game.name = req.body.name;
  //return the updated game
  res.send(game);
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
