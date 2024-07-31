import express, { Request, Response } from 'express';
import { router as userRouter } from './user.routes';
import { router as authRouter } from './auth.routes';
import { MigrationService } from '../services/migration.services';

const migrationService = new MigrationService();

const router = express.Router();

router.get('/hello', (req: any, res: any) => {
  res.send('Hello User!!');
});

router.get('/db/test', async (req: Request, res: Response) => {
  try {
    await migrationService.authentication();
    res.send({
      message: 'success',
    });
  } catch (e: any) {
    res.status(500).send({
      message: `${e}`,
    });
  }
});

router.get('/db/migrate', async (req: Request, res: Response) => {
  try {
    await migrationService.migrate();
    res.send({
      message: 'success',
    });
  } catch (e: any) {
    res.status(500).send({
      message: `${e}`,
    });
  }
});

router.use('/users', userRouter);
router.use('/auth', authRouter);

export { router };
