import EventEmitter from '~/core/infrastructure/event'
import { type TUser } from '../../domain/entities/User'

/***************************
 * User Logged In Event
 ***************************/
const USER_LOGGED_IN = 'userLoggedIn'
type UserLoggedInEvent = {
  user: TUser
}
export const emitUserLoggedInEvent = (user: TUser) => {
  EventEmitter.emit(USER_LOGGED_IN, { user } as UserLoggedInEvent)
}
export const onUserLoggedIn = (
  listener: (event: UserLoggedInEvent) => void,
) => {
  EventEmitter.on(USER_LOGGED_IN, listener)
}

/***************************
 * User Logged Out Event
 ***************************/
const USER_LOGGED_OUT = 'userLoggedOut'
type UserLoggedOutEvent = {
  user: TUser
}
export const emitUserLoggedOutEvent = (user: TUser) => {
  EventEmitter.emit(USER_LOGGED_OUT, { user } as UserLoggedOutEvent)
}
export const onUserLoggedOut = (
  listener: (event: UserLoggedOutEvent) => void,
) => {
  EventEmitter.on(USER_LOGGED_OUT, listener)
}

/****************************
 * User Created Event
 ****************************/
const EVENT_USER_CREATED = 'userCreated'
type UserCreatedEvent = {
  user: TUser
}
export const emitUserCreatedEvent = (user: TUser) => {
  EventEmitter.emit(EVENT_USER_CREATED, { user } as UserCreatedEvent)
}
export const onUserCreated = (listener: (event: UserCreatedEvent) => void) => {
  EventEmitter.on(EVENT_USER_CREATED, listener)
}

/****************************
 * User Deleted Event
 ****************************/
export const USER_DELETED = 'userDeleted'
type UserDeletedEvent = {
  user: TUser
}
export const emitUserDeletedEvent = (user: TUser) => {
  EventEmitter.emit(USER_DELETED, { user } as UserDeletedEvent)
}
export const onUserDeleted = (listener: (event: UserDeletedEvent) => void) => {
  EventEmitter.on(USER_DELETED, listener)
}

/****************************
 * User Password Reset Event
 ****************************/
export const USER_PASSWORD_RESET = 'userPasswordReset'
type UserPasswordResetEvent = {
  user: TUser
}
export const emitUserPasswordResetEvent = (user: TUser) => {
  EventEmitter.emit(USER_PASSWORD_RESET, { user } as UserPasswordResetEvent)
}
export const onUserPasswordReset = (
  listener: (event: UserPasswordResetEvent) => void,
) => {
  EventEmitter.on(USER_PASSWORD_RESET, listener)
}
