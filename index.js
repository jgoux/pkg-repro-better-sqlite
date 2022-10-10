const Database = require('better-sqlite3');
const fs = require('fs');

const dbPath = 'db.sqlite';

const db = new Database(dbPath);

db.prepare('CREATE TABLE sample (id INTEGER PRIMARY KEY, title text)').run();

const insertSample = db.prepare(
  'INSERT INTO sample (id, title) VALUES (@id, @title)'
);

const insertManySample = db.transaction((samples) => {
  for (const sample of samples) {
    insertSample.run(sample);
  }
});

insertManySample([
  { id: 1, title: 'Hello' },
  { id: 2, title: 'World' },
]);

const rows = db.prepare('SELECT * FROM sample').all();

console.log(JSON.stringify(rows, null, 2));

db.close();

fs.unlinkSync(dbPath);
