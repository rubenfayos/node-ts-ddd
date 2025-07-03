import multer from "multer";
import path from "node:path";

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, path.resolve(__dirname, path.join("..", "..", "..", "..", "..", "uploads")));
//   },
//   filename: (_req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${uniqueSuffix}-${file.originalname}`);
//   },
// });

export const uploadMiddleware = multer({ storage: multer.memoryStorage() });
