import {IOpenAPISchemaObject, ITypeScriptType, SchemaObjectType} from '../types';
import {getSchemaObjectType, mapSchemaToTypeValue} from '../utils';

/**
 * Generates a TypeScript type object based on a OpenAPI 3.0 schema.
 * @param nameSchema the name of the schema.
 * @param schemaObject the schema object to convert.
 */
export const generateTSType = (
  nameSchema: string,
  schemaObject: IOpenAPISchemaObject,
  prefixWith = false
): ITypeScriptType => {
  const schemaObjectType: SchemaObjectType | undefined = getSchemaObjectType(schemaObject);
  const name = prefixWith ? `E${nameSchema}` : `asd${nameSchema}`;
  return {
    name,
    comment: schemaObject.description,
    value: mapSchemaToTypeValue(schemaObject),
    valueType: schemaObjectType || 'string'
  };
};
