import { Router } from 'express';
import { User } from '../entity/User';

const router = Router();

router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ where: { login: userId } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as userRoutes };
