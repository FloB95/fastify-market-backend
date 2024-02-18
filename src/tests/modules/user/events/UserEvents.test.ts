import {
  emitUserCreatedEvent,
  onUserCreated,
  emitUserLoggedInEvent,
  onUserLoggedIn,
  emitUserLoggedOutEvent,
  onUserLoggedOut,
  emitUserDeletedEvent,
  onUserDeleted,
  emitUserPasswordResetEvent,
  onUserPasswordReset,
} from '~/modules/user/application/events/UserEvents'
import { type TUser } from '~/modules/user/domain/entities/User'
import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'

describe('userEvents', () => {
  const demoUser: TUser = {
    id: uuidv4(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: null,
  }

  test('emitUserCreatedEvent should emit the userCreated event with the correct parameters', () => {
    // Create a mock event listener
    const listener = jest.fn()

    // Listen for the userCreated event
    onUserCreated(listener)

    // Emit the userCreated event
    emitUserCreatedEvent(demoUser)

    // Expect the listener to have been called with the correct parameters
    expect(listener).toHaveBeenCalledWith({ user: demoUser })
  })

  test('emitUserLoggedInEvent should emit the userLoggedIn event with the correct parameters', () => {
    // Create a mock event listener
    const listener = jest.fn()

    // Listen for the userLoggedIn event
    onUserLoggedIn(listener)

    // Emit the userLoggedIn event
    emitUserLoggedInEvent(demoUser)

    // Expect the listener to have been called with the correct parameters
    expect(listener).toHaveBeenCalledWith({ user: demoUser })
  })

  test('emitUserLoggedOutEvent should emit the userLoggedOut event with the correct parameters', () => {
    // Create a mock event listener
    const listener = jest.fn()

    // Listen for the userLoggedOut event
    onUserLoggedOut(listener)

    // Emit the userLoggedOut event
    emitUserLoggedOutEvent(demoUser)

    // Expect the listener to have been called with the correct parameters
    expect(listener).toHaveBeenCalledWith({ user: demoUser })
  })

  test('emitUserDeletedEvent should emit the userDeleted event with the correct parameters', () => {
    // Create a mock event listener
    const listener = jest.fn()

    // Listen for the userDeleted event
    onUserDeleted(listener)

    // Emit the userDeleted event
    emitUserDeletedEvent(demoUser)

    // Expect the listener to have been called with the correct parameters
    expect(listener).toHaveBeenCalledWith({ user: demoUser })
  })

  test('emitUserPasswordResetEvent should emit the userPasswordReset event with the correct parameters', () => {
    // Create a mock event listener
    const listener = jest.fn()

    // Listen for the userPasswordReset event
    onUserPasswordReset(listener)

    // Emit the userPasswordReset event
    emitUserPasswordResetEvent(demoUser)

    // Expect the listener to have been called with the correct parameters
    expect(listener).toHaveBeenCalledWith({ user: demoUser })
  })
})
