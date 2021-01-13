import { Rule, RuleType } from '@midwayjs/decorator';

export class CategoryDTO {
  @Rule(RuleType.string())
  _id: string;
  @Rule(RuleType.string().required())
  name: string;
}
