import * as migration_20261004_182219_inicial from './20261004_182219_inicial';
import * as migration_20261005_230044_clientes from './20261005_230044_clientes';

export const migrations = [
  {
    up: migration_20261004_182219_inicial.up,
    down: migration_20261004_182219_inicial.down,
    name: '20261004_182219_inicial',
  },
  {
    up: migration_20261005_230044_clientes.up,
    down: migration_20261005_230044_clientes.down,
    name: '20261005_230044_clientes'
  },
];
