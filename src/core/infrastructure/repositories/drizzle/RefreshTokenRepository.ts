import { inject, injectable } from 'tsyringe'
import { db } from '~/core/infrastructure/db/drizzle/setup'
import { refreshTokensTable } from '~/core/infrastructure/db/drizzle/schema'
import { eq } from 'drizzle-orm'
import { BaseRepository } from './BaseRepository'
import { RefreshToken } from '~/core/domain/entities/RefreshToken'
import { type IBaseKeyCache } from '~/core/application/cache/IBaseKeyCache'
import { type IRefreshTokenRepository } from '~/core/application/repositories/IRefreshTokenRepository'
import { type ISqlQueryFindBy } from '~/core/application/repositories/IBaseRepository'
import { sleep } from '~/core/utils/general'

type NewRefreshToken = typeof refreshTokensTable.$inferInsert

/**
 * Repository for managing RefreshToken entities.
 * @class
 * @extends BaseRepository<RefreshToken>
 * @implements IRefreshTokenRepository
 */
@injectable()
class RefreshTokenRepository
  extends BaseRepository<RefreshToken>
  implements IRefreshTokenRepository
{
  /**
   * The table used by this repository.
   * @type {refreshTokensTable}
   */
  table = refreshTokensTable

  /**
   * Creates an instance of RefreshTokenRepository.
   * @param {IBaseKeyCache} appCache - The application cache.
   */
  constructor(@inject('ApplicationKeyCache') appCache: IBaseKeyCache) {
    super(appCache)
  }

  /**
   * Finds all refresh tokens based on the provided parameters.
   * @param {ISqlQueryFindBy<RefreshToken>} params - The parameters to filter the refresh tokens.
   * @returns {Promise<RefreshToken[]>} A promise that resolves to an array of refresh tokens.
   */
  async findAll(
    params: ISqlQueryFindBy<RefreshToken>,
  ): Promise<RefreshToken[]> {
    console.log('params', params)
    await sleep(100)
    throw new Error('Method not implemented.')
  }

  /**
   * Finds a refresh token by its ID.
   * @param {string} id - The ID of the refresh token to find.
   * @returns {Promise<RefreshToken | undefined>} A promise that resolves to the found refresh token or undefined if not found.
   */
  async findOneById(id: string): Promise<RefreshToken | undefined> {
    const refreshToken = await db.query.refreshTokensTable.findFirst({
      where: eq(this.table.id, id),
    })
    return refreshToken
      ? RefreshTokenRepository.mapDbEntryToRefreshToken(refreshToken)
      : undefined
  }

  /**
   * Finds a refresh token by its user ID.
   * @param {string} id - The ID of the user associated with the refresh token.
   * @returns {Promise<RefreshToken | undefined>} A promise that resolves to the found refresh token or undefined if not found.
   */
  async findOneByUserId(id: string): Promise<RefreshToken | undefined> {
    const refreshToken = await db.query.refreshTokensTable.findFirst({
      where: eq(this.table.userId, id),
    })

    return refreshToken
      ? RefreshTokenRepository.mapDbEntryToRefreshToken(refreshToken)
      : undefined
  }

  /**
   * Updates a refresh token with the provided updates.
   * @param {RefreshToken} refreshToken - The refresh token to update.
   * @param {Partial<RefreshToken>} updates - The updates to apply to the refresh token.
   * @returns {Promise<void>} A promise that resolves when the refresh token is updated.
   */
  async update(
    refreshToken: RefreshToken,
    updates: Partial<RefreshToken>,
  ): Promise<void> {
    await db
      .update(this.table)
      .set(updates)
      .where(eq(this.table.id, refreshToken.id))
  }

  /**
   * Deletes a refresh token.
   * @param {RefreshToken} refreshToken - The refresh token to delete.
   * @returns {Promise<boolean>} A promise that resolves to true if the refresh token is deleted successfully.
   */
  async delete(refreshToken: RefreshToken): Promise<boolean> {
    await db
      .delete(this.table)
      .where(eq(this.table.id, refreshToken.id))
      .execute()
    return true
  }

  /**
   * Creates a new refresh token.
   * @param {RefreshToken} refreshToken - The refresh token to create.
   * @returns {Promise<void>} A promise that resolves when the refresh token is created.
   */
  async create(refreshToken: RefreshToken): Promise<void> {
    await db
      .insert(this.table)
      .values({
        id: refreshToken.id,
        expiresAt: refreshToken.expiresAt,
        userId: refreshToken.userId,
        createdAt: refreshToken.createdAt,
        updatedAt: refreshToken.updatedAt,
      } as NewRefreshToken)
      .execute()
  }

  /**
   * Maps a database entry to a refresh token entity.
   * @param {any} dbRefreshToken - The database entry representing a refresh token.
   * @returns {RefreshToken} The mapped refresh token entity.
   */
  public static mapDbEntryToRefreshToken(dbRefreshToken: any): RefreshToken {
    const refreshToken = new RefreshToken(
      dbRefreshToken.id,
      dbRefreshToken.expiresAt ? new Date(dbRefreshToken.expiresAt) : undefined,
      dbRefreshToken.userId,
    )

    refreshToken.setCreatedAt(
      dbRefreshToken.createdAt ? new Date(dbRefreshToken.createdAt) : undefined,
    )

    // can be null if db field is empty or can be undefined if not selected
    if (typeof dbRefreshToken.updatedAt !== 'undefined') {
      refreshToken.setUpdatedAt(
        dbRefreshToken.updatedAt ? new Date(dbRefreshToken.updatedAt) : null,
      )
    } else {
      refreshToken.setUpdatedAt(undefined)
    }
    return refreshToken
  }
}

export default RefreshTokenRepository
