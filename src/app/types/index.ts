export interface IComponentCategory {
  /**类别名称 */
  categoryName: string;
  children: IComponent[];
}

export interface IComponent {
  /**id */
  id: string;
  /**组件名称 */
  name: string;
}
