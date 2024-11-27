type DynamoDBAttributeValue = {
  S?: string;
  N?: string;
  BOOL?: boolean;
  NULL?: boolean;
  M?: { [key: string]: DynamoDBAttributeValue };
  L?: DynamoDBAttributeValue[];
};

type DynamoDBItem = { [key: string]: DynamoDBAttributeValue };

/**
 * Maps a DynamoDB item to a JSON-styled JavaScript object.
 * @param item - The DynamoDB item to convert.
 * @returns A JavaScript object with standard JSON structure.
 */
export const mapDynamoDBItemToJSON = (item: DynamoDBItem): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(item)) {
    result[key] = parseAttributeValue(value);
  }

  return result;
}

/**
 * Recursively parses a DynamoDB attribute value into a JavaScript-native type.
 * @param value - The DynamoDB attribute value to parse.
 * @returns A JavaScript-native representation of the attribute.
 */
const parseAttributeValue = (value: DynamoDBAttributeValue): any => {
  if ('S' in value) return value.S; // String
  if ('N' in value) return parseFloat(value.N!); // Number (convert from string)
  if ('BOOL' in value) return value.BOOL; // Boolean
  if ('NULL' in value) return null; // Null
  if ('M' in value) {
    // Map (nested object)
    const nestedObject: Record<string, any> = {};
    for (const [nestedKey, nestedValue] of Object.entries(value.M!)) {
      nestedObject[nestedKey] = parseAttributeValue(nestedValue);
    }
    return nestedObject;
  }
  if ('L' in value) {
    // List (array)
    return value.L!.map(parseAttributeValue);
  }

  return value; // Return the raw value if no type matches
}