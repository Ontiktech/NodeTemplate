import { Request, Response } from 'express';
import { multipleFileLocalFullPathResolver, rollbackMultipleFileLocalUpload } from '../middleware/fileUploadLocal.middleware';
import { BadRequestException } from '../errors/BadRequestException';
import { TestService } from '../services/tests.services';

const testService = new TestService();

export async function fileUploadTest(req: Request, res: Response) {
  try {
    // throw new BadRequestException('Bad request exception thrown') // Will run "rollbackMultipleFileLocalUpload" and delete files automatically

    if(req.body.file_upload_status)
      throw new BadRequestException(req.body.file_upload_status)

    // fullPathSingleResolver JUST RETURN A STRING BASED ON WHAT IS IN req.body.file
    const fullPath = multipleFileLocalFullPathResolver(req)
    const images = fullPath && Object.keys(fullPath).length ? [...fullPath.images1, ...fullPath.images2] : null

    await testService.createUserWithImages(req.body.username, req.body.password, req.body.username, images);

    res.send({
      message: 'Success. Check the public/{folderName} to view uploaded file.',
    });
  } catch (e: any) {

    await rollbackMultipleFileLocalUpload(req)

    if(e instanceof BadRequestException){
      return res.status(e.statusCode).json({ message : e.message, code : e.statusCode })
    }

    return res.status(500).json({ message : 'Something went wrong! Please try again.', code : 500 })
  }
}
