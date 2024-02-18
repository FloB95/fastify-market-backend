import { type FastifySchema } from 'fastify'
import { CreateUserJsonSchema } from '../application/dtos/UserCreateDto'

export const GetUsersSchema: FastifySchema = {
  description: 'Get all users paginated',
  tags: ['User'],
  response: {
    200: CreateUserJsonSchema.definitions.response,
  },
}

export const CreateUserSchema: FastifySchema = {
  description: 'Create a new user',
  tags: ['User'],
  body: CreateUserJsonSchema.definitions.body,
  response: {
    201: CreateUserJsonSchema.definitions.response,
  },
}
