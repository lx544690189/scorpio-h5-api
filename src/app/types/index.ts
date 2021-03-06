/**组件类别 */
export interface IComponentCategory {
  /**类别名称 */
  categoryName: string;
  children: IComponent[];
}

/**组件 */
export interface IComponent {
  /**id */
  _id: string;
  /**组件名称 */
  name: string;
  /**组件截图 */
  cover: string;
  /**组件名称 */
  generatorSchema: object;
}

export enum CATEGORY_STATUS {
  initial = 1,
  delete,
}

export enum COMPONENT_STATUS {
  initial = 1,
  delete,
}

export enum PAGE_STATUS {
  initial = 1,
  delete,
}
