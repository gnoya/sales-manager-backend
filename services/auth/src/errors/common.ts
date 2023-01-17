import Error from './error-handler'

export class BadRequestError extends Error {
  constructor(reason?: string) {
    super({
      status: 400,
      title: 'badRequest',
      detail: 'The request body was invalid',
      meta: { reason },
    })
  }
}

export class ResourceNotFoundError extends Error {
  constructor() {
    super({
      status: 404,
      title: 'notFound',
      detail: 'Requested resource not found',
    })
  }
}

export class ConflictError extends Error {
  constructor(detail: string) {
    super({ status: 409, title: 'conflict', detail })
  }
}

export class ForbiddenError extends Error {
  constructor(detail?: string) {
    super({
      status: 403,
      title: 'Forbidden',
      detail,
    })
  }
}

export class UnauthorizedError extends Error {
  constructor(detail?: string) {
    super({
      status: 401,
      title: 'unauthorized',
      detail,
    })
  }
}

export class WrongCredentialsError extends Error {
  constructor() {
    super({
      status: 400,
      title: 'wrongCredentials',
      detail: 'Wrong login credentials',
    })
  }
}

export namespace JWTErrors {
  export class BadJWTError extends Error {
    constructor(token: string) {
      super({
        status: 400,
        title: 'badJWT',
        detail: 'The request cannot be authorized due to bad JWT Authorization',
        meta: {
          givenToken: token,
        },
      })
    }
  }

  export class InvalidJWTError extends Error {
    constructor(token: string) {
      super({
        status: 403,
        title: 'invalidJWT',
        detail:
          'The request cannot be authorized, the given JWT was invalid or has expirated',
        meta: {
          givenToken: token,
        },
      })
    }
  }

  export class MissingJWTError extends Error {
    constructor() {
      super({
        status: 400,
        title: 'missingJWT',
        detail: 'Bad request, there was no authorization JWT specified',
      })
    }
  }
}
