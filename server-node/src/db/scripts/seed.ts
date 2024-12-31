import { AppDataSource } from '../../data-source';
import { seedDatabase } from '../seeds/seedDatabase';

AppDataSource.initialize()
  .then(async () => {
    await seedDatabase(AppDataSource);
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  });
