import { GetFileUseCase } from "@modules/file/application/usecase/get-file-usecase";
import { UploadFileUseCase } from "@modules/file/application/usecase/upload-file-usecase";
import { uploadMiddleware } from "@shared/infrastructure/http/middleware/multer";
import { BaseController } from "@shared/infrastructure/http/utils/base-controller";
import { type Request, type Response, Router } from "express";
import { inject, injectable } from "tsyringe";
import type { GetFileParams } from "../contract/get-file.contract";
import { DeleteFileUseCase } from "@modules/file/application/usecase/delete-file-usecase";

@injectable()
export class FileController extends BaseController {
  private router: Router;

  constructor(
    @inject(UploadFileUseCase) private uploadFileUseCase: UploadFileUseCase,
    @inject(GetFileUseCase) private getFileUseCase: GetFileUseCase,
    @inject(DeleteFileUseCase) private deleteFileUseCase: DeleteFileUseCase,
    // @inject(LoginUserCase) private loginUseCase: LoginUserCase,
    // @inject(RegisterUserCase) private registerUseCase: RegisterUserCase,
    // @inject(VerifyEmailUseCase) private verifyEmailUseCase: VerifyEmailUseCase,
    // @inject(ForgetPasswordUseCase) private forgetPasswordUseCase: ForgetPasswordUseCase,
    // @inject(ResetPasswordUseCase) private resetPasswordUseCase: ResetPasswordUseCase,
  ) {
    super();
    this.router = Router();
  }

  register(): Router {
    this.router.post("/upload", uploadMiddleware.single("file"), this.upload);

    this.router.get("/:fileId", this.get);

    this.router.delete("/:fileId", this.delete);

    return this.router;
  }

  upload = async (req: Request, res: Response) => {
    try {
      const file = req.file;

      if (!file) {
        throw new Error("file_not_found");
      }

      const userId = res.locals.user.id;
      const isPublic = req.body.isPublic === "true";

      const result = await this.uploadFileUseCase.execute({ file, isPublic, userId });

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  };

  get = async (req: Request<GetFileParams>, res: Response) => {
    try {
      const userId = res.locals.user.id;

      const result = await this.getFileUseCase.execute({ fileId: req.params.fileId, userId });

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename=${result.filename}`);
      res.sendFile(result.path);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "error_getting_file" });
    }
  };

  delete = async (req: Request<GetFileParams>, res: Response) => {
    try {
      const userId = res.locals.user.id;

      await this.deleteFileUseCase.execute({ fileId: req.params.fileId, userId });

      res.status(204).json();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "error_deleting_file" });
    }
  };
}
