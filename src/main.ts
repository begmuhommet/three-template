import { World } from '@/World';

function main() {
  const container = document.getElementById('container');

  if (container) {
    const world = new World(container);
    world.start();
  }
}

try {
  main();
} catch (err) {
  console.log(err);
}
