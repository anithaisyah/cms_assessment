
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    username: string;
    email: string;
    password: string;
    name: string;
    phone?: Nullable<string>;
}

export class UpdateUserInput {
    username: string;
    email: string;
    name: string;
    phone: string;
}

export class PostInput {
    title: string;
    content?: Nullable<string>;
    published?: Nullable<boolean>;
    tags?: Nullable<Nullable<number>[]>;
}

export class SearchPostInput {
    title?: Nullable<string>;
    content?: Nullable<string>;
}

export class TagInput {
    name: string;
    description?: Nullable<string>;
}

export class User {
    id: number;
    username?: Nullable<string>;
    email?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    posts?: Nullable<Nullable<Post>[]>;
    userProfile?: Nullable<UserProfile>;
}

export class UserProfile {
    id: number;
    name?: Nullable<string>;
    phone?: Nullable<string>;
    userId?: Nullable<number>;
    user?: Nullable<User>;
}

export class Post {
    id: number;
    title?: Nullable<string>;
    content?: Nullable<string>;
    published?: Nullable<boolean>;
    authorId: number;
    author?: Nullable<User>;
    tags?: Nullable<Nullable<PostTag>[]>;
}

export class Tag {
    id: number;
    name?: Nullable<string>;
    description?: Nullable<string>;
    posts?: Nullable<Nullable<Post>[]>;
}

export class PostTag {
    postId: number;
    tagId: number;
    tag?: Nullable<Tag>;
    post?: Nullable<Post>;
}

export abstract class IQuery {
    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract user(id: number): User | Promise<User>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract post(id: number): Post | Promise<Post>;

    abstract posts(input?: Nullable<SearchPostInput>): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;

    abstract tag(id: number): Nullable<Tag> | Promise<Nullable<Tag>>;

    abstract tags(): Nullable<Nullable<Tag>[]> | Promise<Nullable<Nullable<Tag>[]>>;
}

export abstract class IMutation {
    abstract createUser(input?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(id: number, input?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract createPost(input?: Nullable<PostInput>): Nullable<Post> | Promise<Nullable<Post>>;

    abstract updatePost(id: number, input?: Nullable<PostInput>): Nullable<Post> | Promise<Nullable<Post>>;

    abstract deletePost(id: number): Nullable<Post> | Promise<Nullable<Post>>;

    abstract createTag(input?: Nullable<TagInput>): Nullable<Tag> | Promise<Nullable<Tag>>;

    abstract updateTag(input?: Nullable<TagInput>): Nullable<Tag> | Promise<Nullable<Tag>>;

    abstract deleteTag(id: number): Nullable<Tag> | Promise<Nullable<Tag>>;

    abstract signIn(username?: Nullable<string>, pass?: Nullable<string>): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export class AuthResponse {
    token?: Nullable<string>;
    user?: Nullable<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
