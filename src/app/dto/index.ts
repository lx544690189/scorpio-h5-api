import { Rule, RuleType } from '@midwayjs/decorator';

export class ComponentCategoryDTO {
  @Rule(RuleType.string().required())
  categoryName: string;
}

export class ComponentDTO {
  /**id */
  @Rule(RuleType.string())
  _id: string;
  /**类别id */
  @Rule(RuleType.string().required())
  categoryId: string;
  /**组件名称 */
  @Rule(RuleType.string().required())
  name: string;
  /**组件截图 */
  @Rule(RuleType.string())
  cover: string;
  /**组件Schema */
  @Rule(RuleType.object())
  generatorSchema: object;
  /**组件props */
  @Rule(RuleType.object())
  props: object;
  /**组件containerProps */
  @Rule(RuleType.object())
  containerProps: object;
}
