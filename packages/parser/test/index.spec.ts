import path from 'path'
import FirestoreSchemaParser from '../src'

describe('@firestore-schema/parser', () => {
  it('should be able to read yaml', () => {
    expect(
      new FirestoreSchemaParser(
        path.resolve(__dirname, './fixtures/schema.yml')
      ).getSchema()
    ).toBeInstanceOf(Object)
  })

  it('should be able to read json', () => {
    expect(
      new FirestoreSchemaParser(
        path.resolve(__dirname, './fixtures/schema.json')
      ).getSchema()
    ).toBeInstanceOf(Object)
  })
})
