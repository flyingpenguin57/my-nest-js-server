import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
      super('Forbidden', HttpStatus.FORBIDDEN);
    }
}

export class UserNotExist extends HttpException {
    constructor() {
      super('user not exist', 200, {cause: "123456",description: "123qqq"});
    }
}