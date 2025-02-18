import admin from 'firebase-admin'
import { useCallback, useMemo } from 'react'
import { useAsyncError } from '../../lib/hooks/useAsyncError'
import { Seeder, SeederOptions } from '../Seeder'

export const useSeeder = (
  firestore: admin.firestore.Firestore,
  options: SeederOptions
) => {
  const throwError = useAsyncError()

  const seeder = useMemo(() => new Seeder(firestore, options), [
    firestore,
    options,
  ])

  const seed = useCallback(
    async (collections: string | string[] = []) => {
      try {
        return await seeder.seed(collections)
      } catch (e) {
        throwError(e)
        console.log(e)
      }
    },
    [seeder, throwError]
  )

  const seedAll = useCallback(
    async (exclude: string[] = []) => {
      try {
        return await seeder.seedAll(exclude)
      } catch (e) {
        throwError(e)
        console.error(e)
      }
    },
    [seeder, throwError]
  )

  return { seeder, seed, seedAll }
}
