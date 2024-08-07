export type fileFieldNameType = {
  name: string,
  maxCount: number
}[]

export type fieldsType = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number
}

export type formattedPathsType = {
  [key: string]: string[]
}                                                                           