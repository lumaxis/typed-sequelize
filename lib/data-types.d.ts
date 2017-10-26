/**
 * A convenience class holding commonly used data types. The datatypes are used when defining a new model using `Sequelize.define`, like this:
 * ```js
 * sequelize.define('model', {
 *   column: DataTypes.INTEGER
 * })
 * ```
 * When defining a model you can just as easily pass a string as type, but often using the types defined here is beneficial. For example, using `DataTypes.BLOB`, mean
 * that that column will be returned as an instance of `Buffer` when being fetched by sequelize.
 *
 * Some data types have special properties that can be accessed in order to change the data type.
 * For example, to get an unsigned integer with zerofill you can do `DataTypes.INTEGER.UNSIGNED.ZEROFILL`.
 * The order you access the properties in do not matter, so `DataTypes.INTEGER.ZEROFILL.UNSIGNED` is fine as well. The available properties are listed under each data type.
 *
 * To provide a length for the data type, you can invoke it like a function: `INTEGER(2)`
 *
 * Three of the values provided here (`NOW`, `UUIDV1` and `UUIDV4`) are special default values, that should not be used to define types. Instead they are used as shorthands for
 * defining default values. For example, to get a uuid field with a default value generated following v1 of the UUID standard:
 * ```js
 * sequelize.define('model', {
 *   uuid: {
 *     type: DataTypes.UUID,
 *     defaultValue: DataTypes.UUIDV1,
 *     primaryKey: true
 *   }
 * })
 * ```
 * There may be times when you want to generate your own UUID conforming to some other algorithm. This is accomplised
 * using the defaultValue property as well, but instead of specifying one of the supplied UUID types, you return a value
 * from a function.
 * ```js
 * sequelize.define('model', {
 *   uuid: {
 *     type: DataTypes.UUID,
 *     defaultValue: function() {
 *       return generateMyId()
 *     },
 *     primaryKey: true
 *   }
 * })
 * ```
 *
 * @class DataTypes
 */

export type DataType = string | AbstractDataTypeConstructor | AbstractDataType;

export const ABSTRACT: AbstractDataTypeConstructor;

interface AbstractDataTypeConstructor {
  new (options: Object): AbstractDataType;
  (options: Object): AbstractDataType;
  key: string;
  warn(link: string, text: string): void;
  inherits(Constructor: Function): Function;
}

export interface AbstractDataType {
  key: string;
  dialectTypes: string;
  toSql(): string;
  stringify(value: any, options?: Object): string;
  toString(options: Object): string;
}

/**
 * A variable length string. Default length 255
 *
 * Available properties: `BINARY`
 *
 * @property STRING
 */
export const STRING: StringDataTypeConstructor;

interface StringDataTypeConstructor extends AbstractDataTypeConstructor {
  new (length?: number, binary?: boolean): StringDataType;
  new (options?: StringDataTypeOptions): StringDataType;
  (length?: number, binary?: boolean): StringDataType;
  (options?: StringDataTypeOptions): StringDataType;
}

export interface StringDataType extends AbstractDataType {
  options: StringDataTypeOptions;
  BINARY: this;
  validate(value: any): boolean;
}

export interface StringDataTypeOptions {
  length?: number;
  binary?: boolean;
}

/**
 * A fixed length string. Default length 255
 *
 * Available properties: `BINARY`
 *
 * @property CHAR
 */
export const CHAR: CharDataTypeConstructor;

interface CharDataTypeConstructor extends StringDataTypeConstructor {
  new (length?: number, binary?: boolean): CharDataType;
  new (options?: CharDataTypeOptions): CharDataType;
  (length?: number, binary?: boolean): CharDataType;
  (options?: CharDataTypeOptions): CharDataType;
}

export interface CharDataType extends StringDataType {
  options: CharDataTypeOptions;
}

export interface CharDataTypeOptions extends StringDataTypeOptions {}

/**
 * An (un)limited length text column. Available lengths: `tiny`, `medium`, `long`
 * @property TEXT
 */
export const TEXT: TextDataTypeConstructor;

interface TextDataTypeConstructor extends AbstractDataTypeConstructor {
  new (length?: number): TextDataType;
  (options?: TextDataTypeOptions): TextDataType;
}

export interface TextDataType extends AbstractDataType {
  options: TextDataTypeOptions;
  validate(value: any): boolean;
}

export interface TextDataTypeOptions {
 length?: number;
}

export const NUMBER: NumberDataTypeConstructor;

interface NumberDataTypeConstructor extends AbstractDataTypeConstructor {
  new (options?: NumberDataTypeOptions): NumberDataType;
  (options?: NumberDataTypeOptions): NumberDataType;
  options: NumberDataTypeOptions;
  validate(value: any): boolean;
  UNSIGNED: this;
  ZEROFILL: this;
}

export interface NumberDataType extends AbstractDataType {
  options: NumberDataTypeOptions;
  validate(value: any): boolean;
  UNSIGNED: this;
  ZEROFILL: this;
}

export interface NumberDataTypeOptions {
  length?: number;
  zerofill?: boolean;
  decimals?: number;
  precision?: number;
  scale?: number;
  unsigned?: boolean;
}

/**
 * A 32 bit integer.
 *
 * Available properties: `UNSIGNED`, `ZEROFILL`
 *
 * @property INTEGER
 */
export const INTEGER: IntegerDataTypeConstructor;

interface IntegerDataTypeConstructor extends NumberDataTypeConstructor {
  new (length?: number): IntegerDataType;
  new (options?: NumberDataTypeOptions): IntegerDataType;
  (length?: number): IntegerDataType;
  (options?: NumberDataTypeOptions): IntegerDataType;
}

export interface IntegerDataType extends NumberDataType {
  options: NumberDataTypeOptions;
}

export interface IntegerDataTypeOptions {
  length?: number;
}

/**
 * A 64 bit integer.
 *
 * Available properties: `UNSIGNED`, `ZEROFILL`
 *
 * @property BIGINT
 */
export const BIGINT: BigIntDataTypeConstructor;

interface BigIntDataTypeConstructor extends NumberDataTypeConstructor {
  new (length?: number): BigIntDataType;
  new (options?: BigIntDataTypeOptions): BigIntDataType;
  (length?: number): BigIntDataType;
  (options?: BigIntDataTypeOptions): BigIntDataType;
}

export interface BigIntDataType extends NumberDataType {
  options: BigIntDataTypeOptions;
}

export interface BigIntDataTypeOptions {
  length?: number;
}

/**
 * Floating point number (4-byte precision). Accepts one or two arguments for precision
 *
 * Available properties: `UNSIGNED`, `ZEROFILL`
 *
 * @property FLOAT
 */
export const FLOAT: FloatDataTypeConstructor;

interface FloatDataTypeConstructor extends NumberDataTypeConstructor {
   new (length?: number, decimals?: number): FloatDataType;
   new (options?: FloatDataTypeOptions): FloatDataType;
   (length?: number, decimals?: number): FloatDataType;
   (options?: FloatDataTypeOptions): FloatDataType;
 }

export interface FloatDataType extends NumberDataType {
   options: FloatDataTypeOptions;
 }

export interface FloatDataTypeOptions {
   length?: number;
   decimals?: number;
 }

 /**
  * Floating point number (4-byte precision). Accepts one or two arguments for precision
  *
  * Available properties: `UNSIGNED`, `ZEROFILL`
  *
  * @property REAL
  */
export const REAL: RealDataTypeConstructor;

interface RealDataTypeConstructor extends NumberDataTypeConstructor {
  new (length?: number, decimals?: number): RealDataType;
  new (options?: RealDataTypeOptions): RealDataType;
  (length?: number, decimals?: number): RealDataType;
  (options?: RealDataTypeOptions): RealDataType;
}

export interface RealDataType extends NumberDataType {
  options: RealDataTypeOptions;
}

export interface RealDataTypeOptions {
  length?: number;
  decimals?: number;
}

/**
 * Floating point number (8-byte precision). Accepts one or two arguments for precision
 *
 * Available properties: `UNSIGNED`, `ZEROFILL`
 *
 * @property DOUBLE
 */
export const DOUBLE: DoubleDataTypeConstructor;

interface DoubleDataTypeConstructor extends NumberDataTypeConstructor {
  new (length?: number, decimals?: number): DoubleDataType;
  new (options?: DoubleDataTypeOptions): DoubleDataType;
  (length?: number, decimals?: number): DoubleDataType;
  (options?: DoubleDataTypeOptions): DoubleDataType;
}

export interface DoubleDataType extends NumberDataType {
  options: DoubleDataTypeOptions;
}

export interface DoubleDataTypeOptions {
  length?: number;
  decimals?: number;
}

/**
 * Decimal number. Accepts one or two arguments for precision
 *
 * Available properties: `UNSIGNED`, `ZEROFILL`
 *
 * @property DECIMAL
 */
export const DECIMAL: DecimalDataTypeConstructor;

interface DecimalDataTypeConstructor extends NumberDataTypeConstructor {
  new (precision?: number, scale?: number): DecimalDataType;
  new (options?: DecimalDataTypeOptions): DecimalDataType;
  (precision?: number, scale?: number): DecimalDataType;
  (options?: DecimalDataTypeOptions): DecimalDataType;
  PRECISION: this;
  SCALE: this;
}

export interface DecimalDataType extends NumberDataType {
  options: DecimalDataTypeOptions;
}

export interface DecimalDataTypeOptions {
  precision?: number;
  scale?: number;
}

/**
 * A boolean / tinyint column, depending on dialect
 * @property BOOLEAN
 */
export const BOOLEAN: AbstractDataTypeConstructor;

/**
 * A time column
 * @property TIME
 */
export const TIME: AbstractDataTypeConstructor;

/**
 * A datetime column
 * @property DATE
 */
export const DATE: DateDataTypeConstructor;

interface DateDataTypeConstructor extends AbstractDataTypeConstructor {
  new (length?: any): DateDataType;
  new (options?: DateDataTypeOptions): DateDataType;
  (length?: any): DateDataType;
  (options?: DateDataTypeOptions): DateDataType;
}

export interface DateDataType extends AbstractDataTypeConstructor {
  options: DateDataTypeOptions;
}

export interface DateDataTypeOptions {
  length?: any;
}

/**
 * A date only column
 * @property DATEONLY
 */
export const DATEONLY: DateOnlyDataTypeConstructor;

interface DateOnlyDataTypeConstructor extends AbstractDataTypeConstructor {
  new (length: any): DateOnlyDataType;
  new (options: DateOnlyDataTypeOptions): DateOnlyDataType;
  (length: any): DateOnlyDataType;
  (options: DateOnlyDataTypeOptions): DateOnlyDataType;
}

export interface DateOnlyDataType extends AbstractDataType {
  options: DateOnlyDataTypeOptions;
}

export interface DateOnlyDataTypeOptions {
  length?: any;
}

/**
 * A key / value column. Only available in postgres.
 * @property HSTORE
 */
export const HSTORE: AbstractDataTypeConstructor;

/**
 * A JSON string column. Only available in postgres.
 * @property JSON
 */
export const JSON: AbstractDataTypeConstructor;

/**
 * A pre-processed JSON data column. Only available in postgres.
 * @property JSONB
 */
export const JSONB: AbstractDataTypeConstructor;

/**
 * A default value of the current timestamp
 * @property NOW
 */
export const NOW: AbstractDataTypeConstructor;

/**
 * Binary storage. Available lengths: `tiny`, `medium`, `long`
 *
 * @property BLOB
 */
export const BLOB: BlobDataTypeConstructor;

interface BlobDataTypeConstructor extends AbstractDataTypeConstructor {
  new (length?: number): BlobDataType;
  new (options?: BlobDataTypeOptions): BlobDataType;
  (length?: number): BlobDataType;
  (options?: BlobDataTypeOptions): BlobDataType;
}

export interface BlobDataType extends AbstractDataType {
  options: BlobDataTypeOptions;
  escape: boolean;
}

export interface BlobDataTypeOptions {
  length?: number;
  escape?: boolean;
}

/**
 * Range types are data types representing a range of values of some element type (called the range's subtype).
 * Only available in postgres.
 * See {@link http://www.postgresql.org/docs/9.4/static/rangetypes.html|Postgres documentation} for more details
 * @property RANGE
 */
export const RANGE: RangeDataTypeConstructor;

export type RangeableDataType = IntegerDataTypeConstructor | IntegerDataType | BigIntDataTypeConstructor | BigIntDataType
  | DecimalDataTypeConstructor | DecimalDataType | DateOnlyDataTypeConstructor | DateOnlyDataType | DateDataTypeConstructor | DateDataType;

interface RangeDataTypeConstructor extends AbstractDataTypeConstructor {
  new <T extends RangeableDataType>(subtype?: T): RangeDataType<T>;
  new <T extends RangeableDataType>(options: RangeDataTypeOptions<T>): RangeDataType<T>;
  <T extends RangeableDataType>(subtype?: T): RangeDataType<T>;
  <T extends RangeableDataType>(options: RangeDataTypeOptions<T>): RangeDataType<T>;
}

export interface RangeDataType<T extends RangeableDataType> extends AbstractDataType {
  options: RangeDataTypeOptions<T>;
}

export interface RangeDataTypeOptions<T extends RangeableDataType> {
  subtype?: T;
}

/**
 * A column storing a unique universal identifier. Use with `UUIDV1` or `UUIDV4` for default values.
 * @property UUID
 */
export const UUID: AbstractDataTypeConstructor;

/**
 * A default unique universal identifier generated following the UUID v1 standard
 * @property UUIDV1
 */
export const UUIDV1: AbstractDataTypeConstructor;

/**
 * A default unique universal identifier generated following the UUID v4 standard
 * @property UUIDV4
 */
export const UUIDV4: AbstractDataTypeConstructor;

/**
 * A virtual value that is not stored in the DB. This could for example be useful if you want to provide a default value in your model that is returned to the user but not stored in the DB.
 *
 * You could also use it to validate a value before permuting and storing it. Checking password length before hashing it for example:
 * ```js
 * sequelize.define('user', {
 *   password_hash: DataTypes.STRING,
 *   password: {
 *     type: DataTypes.VIRTUAL,
 *     set: function (val) {
 *       this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
 *       this.setDataValue('password_hash', this.salt + val);
 *     },
 *     validate: {
 *       isLongEnough: function (val) {
 *         if (val.length < 7) {
 *           throw new Error("Please choose a longer password")
 *         }
 *       }
 *     }
 *   }
 * })
 * ```
 *
 * VIRTUAL also takes a return type and dependency fields as arguments
 * If a virtual attribute is present in `attributes` it will automatically pull in the extra fields as well.
 * Return type is mostly useful for setups that rely on types like GraphQL.
 * ```js
 * {
 *   active: {
 *     type: new DataTypes.VIRTUAL(DataTypes.BOOLEAN, ['createdAt']),
 *     get: function() {
 *       return this.get('createdAt') > Date.now() - (7 * 24 * 60 * 60 * 1000)
 *     }
 *   }
 * }
 * ```
 *
 * In the above code the password is stored plainly in the password field so it can be validated, but is never stored in the DB.
 * @property VIRTUAL
 * @alias NONE
 */
export const VIRTUAL: VirtualDataTypeConstructor;

interface VirtualDataTypeConstructor extends AbstractDataTypeConstructor {
  new <T extends AbstractDataTypeConstructor|AbstractDataType>(ReturnType: T, fields?: string[]): VirtualDataType<T>;
  <T extends AbstractDataTypeConstructor|AbstractDataType>(ReturnType: T, fields?: string[]): VirtualDataType<T>;
}

export interface VirtualDataType<T extends AbstractDataTypeConstructor|AbstractDataType> extends AbstractDataType {
  returnType: T;
  fields: string[];
}

/**
 * An enumeration. `DataTypes.ENUM('value', 'another value')`.
 *
 * @property ENUM
 */
export const ENUM: EnumDataTypeConstructor;

interface EnumDataTypeConstructor extends AbstractDataTypeConstructor {
  new <T extends string>(...values: T[]): EnumDataType<T>;
  new <T extends string>(options: EnumDataTypeOptions<T>): EnumDataType<T>;
  <T extends string>(...values: T[]): EnumDataType<T>;
  <T extends string>(options: EnumDataTypeOptions<T>): EnumDataType<T>;
}

export interface EnumDataType<T extends string> extends AbstractDataType {
  values: T[];
  options: EnumDataTypeOptions<T>;
}

export interface EnumDataTypeOptions<T extends string> {
  values: T[];
}

/**
 * An array of `type`, e.g. `DataTypes.ARRAY(DataTypes.DECIMAL)`. Only available in postgres.
 * @property ARRAY
 */
export const ARRAY: ArrayDataTypeConstructor;

interface ArrayDataTypeConstructor extends AbstractDataTypeConstructor {
  new <T extends AbstractDataTypeConstructor|AbstractDataType>(type: T): ArrayDataType<T>;
  new <T extends AbstractDataTypeConstructor|AbstractDataType>(options: ArrayDataTypeOptions<T>): ArrayDataType<T>;
  <T extends AbstractDataTypeConstructor|AbstractDataType>(type: T): ArrayDataType<T>;
  <T extends AbstractDataTypeConstructor|AbstractDataType>(options: ArrayDataTypeOptions<T>): ArrayDataType<T>;
  is<T extends AbstractDataTypeConstructor|AbstractDataType>(obj: any, type: T): obj is ArrayDataType<T>;
}

export interface ArrayDataType<T extends AbstractDataTypeConstructor|AbstractDataType> extends AbstractDataType {
  options: ArrayDataTypeOptions<T>;
}

export interface ArrayDataTypeOptions<T extends AbstractDataTypeConstructor|AbstractDataType> {
  type: T;
}

/**
 * A geometry datatype represents two dimensional spacial objects.
 * @property GEOMETRY
 */
export const GEOMETRY: GeometryDataTypeConstructor;

interface GeometryDataTypeConstructor extends AbstractDataTypeConstructor {
  new (type: string, srid?: number): GeometryDataType;
  new (options: GeometryDataTypeOptions): GeometryDataType;
  (type: string, srid?: number): GeometryDataType;
  (options: GeometryDataTypeOptions): GeometryDataType;
}

export interface GeometryDataType extends AbstractDataType {
  options: GeometryDataTypeOptions;
  type: string;
  srid?: number;
  escape: boolean;
}

export interface GeometryDataTypeOptions {
  type: string;
  srid?: number;
}

/**
 * A geography datatype represents two dimensional spacial objects in an elliptic coord system.
 * @property GEOGRAPHY
 */
export const GEOGRAPHY: GeographyDataTypeConstructor;

interface GeographyDataTypeConstructor extends AbstractDataTypeConstructor {
  new (type: string, srid?: number): GeographyDataType;
  new (options: GeographyDataTypeOptions): GeographyDataType;
  (type: string, srid?: number): GeographyDataType;
  (options: GeographyDataTypeOptions): GeographyDataType;
}

export interface GeographyDataType extends AbstractDataType {
  options: GeographyDataTypeOptions;
  type: string;
  srid?: number;
  escape: boolean;
}

export interface GeographyDataTypeOptions {
  type: string;
  srid?: number;
}

export const NONE: typeof VIRTUAL;
// export ['DOUBLE PRECISION']: typeof DOUBLE;

export interface DataTypes {
  ABSTRACT: typeof ABSTRACT;
  STRING: typeof STRING;
  CHAR: typeof CHAR;
  TEXT: typeof TEXT;
  NUMBER: typeof NUMBER;
  INTEGER: typeof INTEGER;
  BIGINT: typeof BIGINT;
  FLOAT: typeof FLOAT;
  REAL: typeof REAL;
  DOUBLE: typeof DOUBLE;
  DECIMAL: typeof DECIMAL;
  BOOLEAN: typeof BOOLEAN;
  TIME: typeof TIME;
  DATE: typeof DATE;
  DATEONLY: typeof DATEONLY;
  HSTORE: typeof HSTORE;
  JSON: typeof JSON;
  JSONB: typeof JSONB;
  NOW: typeof NOW;
  BLOB: typeof BLOB;
  RANGE: typeof RANGE;
  UUID: typeof UUID;
  UUIDV1: typeof UUIDV1;
  UUIDV4: typeof UUIDV4;
  VIRTUAL: typeof VIRTUAL;
  ENUM: typeof ENUM;
  ARRAY: typeof ARRAY;
  GEOMETRY: typeof GEOMETRY;
  GEOGRAPHY: typeof GEOGRAPHY;
  'DOUBLE PRECISION': typeof DOUBLE;
}
