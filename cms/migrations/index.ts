import * as migration_20261004_182219_inicial from './20261004_182219_inicial';

export const migrations = [
  {
    up: migration_20261004_182219_inicial.up,
    down: migration_20261004_182219_inicial.down,
    name: '20261004_182219_inicial'
  },
];
