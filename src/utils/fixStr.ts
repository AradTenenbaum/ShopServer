const path = require("path");

export function getParentPathByLevels(filePath: string, levels: number) {
  const normalizedFilePath = path.normalize(filePath);
  const parts = normalizedFilePath.split(path.sep);

  if (parts.length <= levels) {
    return "";
  }

  const parentParts = parts.slice(0, -levels);
  const parentPath = parentParts.join(path.sep);

  return parentPath;
}
