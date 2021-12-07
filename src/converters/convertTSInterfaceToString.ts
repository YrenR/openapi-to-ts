import {ITypeScriptInterface} from '../types';
import {toPascalCase} from '../utils';
import {toJSDocComment} from '../utils/toJSDocComment';
import {getInterfacesWithoutRepeat} from '../utils/getInterfacesWithoutRepeat';
import {convertTSPropertiesToString} from './convertTSPropertiesToString';

/**
 * Converts a TypeScript interface object to a string.
 * @param interfaceObject the TypeScript interface to convert to a string.
 */
export const convertTSInterfaceToString = (interfaceObject: ITypeScriptInterface): string => {
  const name = toPascalCase(interfaceObject.name);
  let interfaceString = '';

  if (interfaceObject.properties) {
    const importType = getInterfacesWithoutRepeat(name, interfaceObject.properties);
    interfaceString += importType.map((x) => `import {${x}} from './${x}';\n`).join('');
    interfaceString += `\n`;
  }

  /** Step 1: Write the JSDoc comment above the interface being declared. */
  interfaceString += toJSDocComment(interfaceObject.name, interfaceObject.comment);

  /** Step 2: Write the export and name of the interface. */
  interfaceString += `export interface ${name} {\n`;

  /** Step 3: Write the properties of the interface. */
  interfaceString += convertTSPropertiesToString(interfaceObject.properties);

  /** Step 4: Write the interface closure. */
  interfaceString += `}\n`;

  return interfaceString;
};
