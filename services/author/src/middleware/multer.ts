import multer from 'multer'

const storage = multer.memoryStorage();

const uploadfile = multer({storage: storage}).single('file')

export default uploadfile;
