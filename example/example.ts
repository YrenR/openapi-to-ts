/**
 * This file was auto-generated by openapi-to-ts. Do not change it manually!
 */

export interface IPet {
  id: number;
  name: string;
  tag?: string;
}

export interface IPets {
  pet?: IPet;
}

/**
 * This is the common error model.
 */
export interface IError {
  code: number;
  message: string;
}
