import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { assertType } from 'typescript-is'

export enum PrimitiveType {
  STRING = 'String',
  NUMBER = 'Number',
  ARRAY = 'Array',
  MAP = 'Map',
  GEO_POINT = 'GeoPoint',
  REF = 'Ref',
}

export interface Ref {
  $ref: string
}

interface ColDef<T extends PrimitiveType> {
  type: T
  required?: boolean
}

interface AutoIdDef {
  auto: true
}

interface CustomIdDef {
  auto: false
}

type StringFakerTypes = 'name.firstName' | 'name.lastName'

interface StringColDef extends ColDef<PrimitiveType.STRING> {
  'x-faker'?: StringFakerTypes
  defaultValue?: string
}

type NumberFakerTypes = ''

interface NumberColDef extends ColDef<PrimitiveType.NUMBER> {
  'x-faker'?: NumberFakerTypes
  defaultValue?: number
}

interface ArrayColDef extends ColDef<PrimitiveType.ARRAY> {
  children: PrimitiveColDef
  defaultValue?: any[] // TODO: Child value types
}

interface MapColDef extends ColDef<PrimitiveType.MAP> {
  children: {
    [key: string]: PrimitiveColDef
  }
  defaultValue?: {
    [key: string]: any // TODO: Child value types
  }
}

interface GeoPointColDef extends ColDef<PrimitiveType.GEO_POINT> {
  defaultValue?: {
    lat: number
    lng: number
  }
}

interface RefColDef extends ColDef<PrimitiveType.REF> {}

type PrimitiveColDef =
  | StringColDef
  | NumberColDef
  | ArrayColDef
  | MapColDef
  | GeoPointColDef
  | RefColDef

export interface CollectionSchema {
  $id: AutoIdDef | CustomIdDef
  $fields: {
    [key: string]: PrimitiveColDef
  }
  $subCollections?: {
    [collectionPath: string]: CollectionSchema
  }
}

export interface Schema {
  name: string
  version: string
  collections: { [collectionPath: string]: CollectionSchema }
}

export default class FirestoreSchemaParser {
  private _schema: Schema

  constructor(pathOrUrlOrSchema: string | Schema) {
    if (typeof pathOrUrlOrSchema === 'string') {
      this._schema = this.read(pathOrUrlOrSchema)
    } else {
      this._schema = pathOrUrlOrSchema
    }

    assertType<Schema>(this._schema)
  }

  getSchema(): Schema {
    return this._schema
  }

  getCollectionNames(): string[] {
    // return this.schema
    return []
  }

  private read(pathOrUrl: string) {
    switch (path.extname(pathOrUrl)) {
      case '.yaml':
      case '.yml':
        return yaml.safeLoad(
          fs.readFileSync(path.resolve(process.cwd(), pathOrUrl), 'utf8')
        )

      case '.json':
        return JSON.parse(
          fs.readFileSync(path.resolve(process.cwd(), pathOrUrl), 'utf8')
        )

      default: {
        throw new Error('Unable to parse file.')
      }
    }
  }
}
