import { FileModel } from "./FileModel";
import { FolderModel } from "./FolderModel";

export type Resource = FolderModel | FileModel;

export function isFolderModel(r:Resource): r is FolderModel{
    return 'children' in r;
}

export function isFileModel(r:Resource): r is FileModel{
    return !('children' in r);
}