import { Rule, RuleType } from '@midwayjs/decorator';

export class ComponentCategoryDTO {
  @Rule(RuleType.string().required())
  categoryName: string;
}

export class ComponentDTO {
  /**id */
  @Rule(RuleType.string())
  _id: string;
  /**组件名称 */
  @Rule(RuleType.string().required())
  name: string;
  /**组件截图 */
  @Rule(RuleType.string())
  cover: string;
  /**组件名称 */
  @Rule(RuleType.object())
  schema: object;
}
