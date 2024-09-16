const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
};

// You can use function find()
function get() {
  return db('users');
}

// You can use findById
function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

// You can use findUserPosts
function getUserPosts(userId) {
  return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.user_id', userId);
}


// instead of function insert() you can use function add() for less confusion
// Note .insert on line 37 is a key word needed, line 32 is not a key word & can be switched, the two are not related or reliant upon each other
function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(rows => {
      return getById(id);
    });
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}
