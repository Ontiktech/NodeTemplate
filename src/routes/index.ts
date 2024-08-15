import express, { Request, Response } from 'express';
import { router as userRouter } from './user.routes';
import { router as authRouter } from './auth.routes';
import { MigrationService } from '../services/migration.services';
import { multipleFileLocalUploader } from '../middleware/fileUploadLocal.middleware';
import { fileDeleteTest, fileUploadTest } from '../controllers/test.controller';
import { JwtMiddleware } from 'middleware/jwt.middleware';

const migrationService = new MigrationService();
const jwtMiddleware = new JwtMiddleware();

const router = express.Router();

router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello User!!');
});

router.get('/db/test', async (req: Request, res: Response) => {
  try {
    await migrationService.authentication();
    res.send({
      message: 'success',
    });
  } catch (error) {
    res.status(500).send({
      message: `${error}`,
    });
  }
});

router.post(
  '/fileUploadTest',
  multipleFileLocalUploader(
    [
      { name: 'images1', maxCount: 1 },
      { name: 'images2', maxCount: 2 },
    ],
    'files',
    31457280,
  ),
  fileUploadTest,
);
router.delete('/fileDeleteTest/:id', fileDeleteTest);

router.get('/db/migrate', async (req: Request, res: Response) => {
  try {
    await migrationService.migrate();
    res.send({
      message: 'success',
    });
  } catch (error) {
    res.status(500).send({
      message: `${error}`,
    });
  }
});

router.use('/users', jwtMiddleware.verifyToken, userRouter);
router.use('/auth', authRouter);

export { router };
