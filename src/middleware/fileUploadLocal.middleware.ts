// IMPORT MULTER FOR FILE UPLOAD
import fs from "fs"
import multer, { FileFilterCallback } from "multer"
import { Request } from 'express'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

type fileFieldNameType = {
  name: string,
  maxCount: number
}[]

type fieldsType = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number
}

type formattedPathsType = {
  [key: string]: string[]
}                                                                           
  // FILEFIELDNAME(required), DEFAULT PATH = 'temp' & DEFAULT MAXSIZE = 30 MB
  export const multipleFileLocalUploader = (fileFieldName: fileFieldNameType , path = 'temp', maxSize = 31457280) => {
    const storage = multer.diskStorage({
      // WHERE THE FILE SHOULD BE STORED
      destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        const dir = './src/public/' + path;

        if (!fs.existsSync(dir))
            fs.mkdirSync(dir, { recursive: true });

        cb(null, dir)
      },
      // LOGIC FOR SETTING THE FILENAME USED TO STORE THE FILE
      filename: function (req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
        const filename = Date.now() + randomNum + '-' + file.originalname.trim().replaceAll(' ', '_')

        cb(null, filename)
      }
    })

    // LOGIC FOR IF THE FILE SHOULD BE ALLOWED TO BE UPLOADED OR NOT 
    const additionalValidation = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
      const fileSize = parseInt(req.headers["content-length"]!)
      if(fileSize > maxSize){
        req.body.file_upload_status = 'File too big to be uploaded to server'
        return cb(null, false)
      }
    
      return cb(null, true)
    }

    // RETURN MULTER INSTANCE WITH NECESSARY OPTIONS
    return multer({
      storage: storage, 
      // limits: limits, 
      fileFilter: additionalValidation
    }).fields(fileFieldName)
  }

  export const rollbackMultipleFileLocalUpload = async (req: Request) => {
    if(!Object.keys(req.files!).length)
      return;

    // IF EXISTS/NOT EMPTY CHECK
    Object.values(req.files!).forEach(async (fields: fieldsType[]) => {
      // IF EXISTS/NOT EMPTY CHECK
      fields.map(async (field: fieldsType) => {
          const directoryPath = 'public/' +
                                  field.path.substring(field.path.indexOf('\\') + 1, field.path.lastIndexOf('\\')) +
                                  '/' +
                                  field.filename

          // IF EXISTS/NOT EMPTY CHECK. DUNNO WHAT TO DO WITH THIS...
          if(field && fs.existsSync(directoryPath)){
            await fs.unlinkSync(directoryPath);
          }
      })
    })

    return;
  }

  export const deleteMultipleFileLocal = async (req: Request, filePaths: string[]) => {
    if(!filePaths)
      return;

    filePaths.map(async (filePath) => {
      const tempFilePath = 'public/' + filePath.replace((process.env.FILE_BASE_URL === '' ? (req.protocol + '://' + req.get('host')) : process.env.FILE_BASE_URL) + '/', '')
      if(fs.existsSync(tempFilePath))
        await fs.unlinkSync(tempFilePath);
    })

    return;
  }

  export const multipleFileLocalFullPathResolver = (req: Request) => {
    if(!Object.keys(req.files!).length)
      return;

    const formatted_paths: formattedPathsType = {};

    Object.entries(req.files!).map((element) => {
      let paths: Array<string> = [];
      element[1].map((fields: fieldsType) => {
        // console.log('fields', fields);
        paths = [(!process.env.FILE_BASE_URL || process.env.FILE_BASE_URL === '' ? (req.protocol + '://' + req.get('host')) : process.env.FILE_BASE_URL) + 
                '/' +
                fields.path.substring(fields.path.indexOf('\\') + 1, fields.path.lastIndexOf('\\')).replace('public\\', '') +
                '/' +
                fields.filename, ...paths]
      })

      formatted_paths[element[0]] = paths
    })

    return formatted_paths;
  }
