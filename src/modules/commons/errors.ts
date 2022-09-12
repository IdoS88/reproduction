export class err_illegalMissingProject extends Error {
    constructor(message) {
      super(message);
      this.name = "illegalMissingProject";
    }
};

export class err_EntityNotFound extends Error {
    constructor(message) {
      super(message);
      this.name = "entityNotFound";
    }
};

export class err_illegelParameterValue extends Error {
    constructor(message) {
      super(message);
      this.name = "illegelParameterValue";
    }
};