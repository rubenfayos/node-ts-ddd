import {AggregateRoot} from "@core/domain/aggregate/aggregate-root";
import crypto from "node:crypto";

type FileProps = {
  id: string;
  path: string;
  isPublic?: boolean;
  relativePath: string;
  userId?: string;
  filename: string;
  mimetype: string;
  size: number;
};

export class File extends AggregateRoot {

    private readonly id: string;
    private readonly path: string;
    private readonly relativePath: string;
    private readonly isPublic: boolean;
    private readonly userId?: string;
    private readonly filename: string;
    private readonly mimetype: string;
    private readonly size: number;

  constructor(props: FileProps) {
    super();
    this.id = props.id;
    this.path = props.path;
    this.isPublic = props.isPublic ?? false;
    this.userId = props.userId;
    this.relativePath = props.relativePath;
    this.filename = props.filename;
    this.mimetype = props.mimetype;
    this.size = props.size;
  }

  static create(props: Omit<FileProps, "id">): File {
    return new File({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  getId() {
    return this.id;
  }

  getPath() {
    return this.path;
  }

  getRelativePath() {
    return this.relativePath;
  }

  getFilename() {
    return this.filename;
  }

  getMimetype() {
    return this.mimetype;
  }

  getSize() {
    return this.size;
  }

  getIsPublic() {
    return this.isPublic;
  }

  getUserId() {
    return this.userId;
  } 
}
