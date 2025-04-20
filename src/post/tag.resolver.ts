import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag, TagInput } from 'src/graphql';

@Resolver('Tag')
export class TagResolver {
  constructor(private tagService: TagService) {}

  @ResolveField('posts')
  async posts(@Parent() tag: Tag) {
    return [];
  }

  @Query('tag')
  async tag(@Args('id') id: number) {
    return this.tagService.findById(id);
  }
  @Query('tags')
  async tags() {
    return this.tagService.findAll();
  }

  @Mutation('createTag')
  async createTag(@Args('input') input: TagInput) {
    return this.tagService.create(input);
  }
  @Mutation('updateTag')
  async updateTag(@Args('id') id: number, @Args('input') input: TagInput) {
    return this.tagService.update(id, input);
  }
  @Mutation('deleteTag')
  async deleteTag(@Args('id') id: number) {
    return this.tagService.delete(id);
  }
}
