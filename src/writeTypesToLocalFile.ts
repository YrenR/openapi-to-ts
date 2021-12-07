import fs from 'fs';

/**
 * Use this method to write the types to the local file system
 * of the users computer. It recursively creates missing directories.
 * @param filePath the path where the file should be written to.
 * @param types the types to write to the specified filePath.
 */
export const writeTypesToLocalFile = (filePath: string, fileName: string, types: string): void => {
  /** Make sure that the directories exist, otherwise create them. */
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  /** Finally write the file to the specified location. */
  const fullPath = `${filePath}/${fileName}`;
  fs.writeFileSync(fullPath, types, 'utf8');
};
