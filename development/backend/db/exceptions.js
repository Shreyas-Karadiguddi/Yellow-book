export class NoUserFound extends Error {
  constructor(userName) {
    super(`${userName} not found`);
  }
}

export class InvalidPassword extends Error {
  constructor(message) {
    super(message);
  }
}

export class UnautherizedUser extends Error {
  constructor(message) {
    super(message);
  }
}

export class UserAlreadyExists extends Error {
  constructor(userName) {
    super(`${userName} already exists`);
  }
}

export class InvalidUserInput extends Error {
  constructor() {
    super("Invalid inputs");
  }
}

export class NoCustomerFound extends Error {
  constructor(customerId) {
    super(`Customer with ID ${customerId} not found`);
  }
}
