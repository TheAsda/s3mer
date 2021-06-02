export class AlreadyHostedError extends Error {
  name = 'AlreadyHostedError';
  constructor(id: string) {
    super();
    this.message = `Room with id '${id}' is already hosted`;
  }
}

export class NotHostedError extends Error {
  name = 'NotHostedError';
  constructor(id: string) {
    super();
    this.message = `Room with id '${id}' is not hosted`;
  }
}

export class AlreadyJoinedError extends Error {
  name = 'AlreadyJoinedError';
  constructor(id: string) {
    super();
    this.message = `Viewer with id '${id}' already joined`;
  }
}

export class NotJoinedError extends Error {
  name = 'NotJoinedError';
  constructor(id: string) {
    super();
    this.message = `Viewer with id '${id}' have not join`;
  }
}

export class StreamNotStartedError extends Error {
  name = 'StreamNotStartedError';
  constructor(id: string) {
    super();
    this.message = `Stream not started in room with id '${id}'`;
  }
}
