import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsBoolean, isBoolean, IsEmail, IsOptional, isString, IsString, MaxLength, MinLength } from "class-validator";
import { IsUsernameUnique } from "./unique-username.validator";
import { isRequiredArgument, isRequiredInputField } from "graphql";

@InputType()
export class CreateUserInput {
    @Field()
    @MinLength(3, { message: 'Username must be at least 3 characters long'})
    @MaxLength(20, { message: 'Username must not exceed 20 characters'})
    // @IsUsernameUnique({ message: 'Username is already in use'})
    username: string;

    @Field()
    @IsEmail({}, { message: 'Email must be a valid email address'})
    email: string;

    @Field()
    @MinLength(6, { message: 'Password must be at least 6 characters long'})
    password: string;
 
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsOptional()
    phone: string;
}

@InputType()
export class UpdateUserInput {
    @Field()
    @MinLength(3, { message: 'Username must be at least 3 characters long'})
    @MaxLength(20, { message: 'Username must not exceed 20 characters'})
    // @IsUsernameUnique({ message: 'Username is already in use'})
    username: string;

    @Field()
    @IsEmail({}, { message: 'Email must be a valid email address'})
    email: string;

 
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsOptional()
    phone: string;
}

@InputType()
export class PostInput {
    @Field()
    @IsString()
    @MinLength(5, { message: 'Title must be at least 5 characters long'})
    @MaxLength(100, { message: 'Title must not exceed 100 characters'})
    title: string;

    @Field()
    @IsString()
    content: string;

    @Field()
    @IsBoolean()
    published: boolean;

    @Field()
    @IsArray()
    tags: [number];
}