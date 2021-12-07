import {ITypeScriptProperty} from '..';

/**
 * Delete the name of a repeating interface
 * @param interfaces
 * @returns
 */
export const getInterfacesWithoutRepeat = (name: string, interfaceProps: ITypeScriptProperty[]): string[] => {
  const interfacesName = interfaceProps.map((x) => x.importType || '').flat();
  return interfacesName.filter((item, i) => item !== name && interfacesName.indexOf(item) === i);
};
