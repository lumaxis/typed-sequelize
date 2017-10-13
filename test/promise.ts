import Sequelize = require('sequelize');
import Promise = require('sequelize/lib/promise');

let p: Promise<number>;
p
  .then((arg: number) => ({}))
  .then((a: {}) => void 0);

p = new Sequelize.Promise<number>(() => { return; });
