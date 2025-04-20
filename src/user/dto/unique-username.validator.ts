import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUsernameUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UserService) { }

    async validate(username: string): Promise<boolean> {
        const user = await this.userService.findOne({ username });
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        return `Username "${args.value}" is already taken`;
    }
}

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUsernameUniqueConstraint,
        });
    };
}
