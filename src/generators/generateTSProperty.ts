import {IOpenAPIReferenceObject, IOpenAPISchemaObject, ITypeScriptProperty, SchemaObjectType} from '../types';
import {getSchemaObjectType, mapSchemaToTypeValue} from '../utils';
import {getSchemaNameFromRef} from '../utils/getSchemaNameFromRef';
import {getNameFromRef} from '../utils/getNameFromRef';
import {isReferenceObject} from '../utils/isReferenceObject';
import {toCamelCase} from '../utils/toCamelCase';
/**
 * Converts a OpenAPI 3.0 property to TypeScript property object.
 * @param schemaObject the schema object to convert the properties of.
 * @param requiredProperties an array of required properties for the schema.
 * @param name the name of the property to be generated.
 */
export function generateTSProperty(
  schemaObject: IOpenAPISchemaObject | IOpenAPIReferenceObject,
  requiredProperties: string[] | undefined,
  name: string | null
): ITypeScriptProperty {
  let generatedProperty: ITypeScriptProperty;
  const schemaObjectType: SchemaObjectType | undefined = getSchemaObjectType(schemaObject);

  /**
   * Handle the property generation for the type IOpenAPIReferenceObject, since we need to compute the name.
   * $ref is not declared with a name itself. As such, we need to get the name from the $ref value.
   * For example, the name for $ref: `#/components/schemas/NewPet` would become `newPet`.
   * For the type IOpenAPISchemaObject, we can get the name from the JSON key.
   */
  if (isReferenceObject(schemaObject)) {
    /** Fallback to $ref name. */
    const propertyName = name || toCamelCase(getSchemaNameFromRef(schemaObject.$ref));
    const value = mapSchemaToTypeValue(schemaObject);
    const importType: string[] = [];

    const nameFromRef = getNameFromRef(schemaObject.$ref);
    if (nameFromRef !== '') importType.push(nameFromRef);

    generatedProperty = {
      name: propertyName,
      nullable: false,
      optional: !requiredProperties?.includes(propertyName),
      value,
      valueType: schemaObjectType || 'string',
      importType
    };
  } else {
    /** Fall back to a generic map. */
    const value = mapSchemaToTypeValue(schemaObject);
    const propertyName = name || '[key: string]';

    const importType: string[] = [];

    if (schemaObject.items && schemaObject.items?.$ref !== '') {
      const itemsType: string = getNameFromRef(schemaObject.items.$ref);
      importType.push(itemsType);
    }

    generatedProperty = {
      name: propertyName,
      nullable: schemaObject.nullable || false,
      optional: !name ? false : !requiredProperties?.includes(propertyName),
      value,
      valueType: schemaObjectType || 'string',
      importType
    };
  }

  return generatedProperty;
}
