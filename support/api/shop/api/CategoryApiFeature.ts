import AbstractFeature from "./AbstractFeature";
import { CategoryData } from "../dataType/dataType";

class CategoryApiFeature extends AbstractFeature {
  public readonly URI: string = "/categories";

  create(category_data?: CategoryData) {
    let categoryData: CategoryData = this.prepareCategoryData(category_data);
    return super.create(categoryData);
  }

  get(id: number) {
    return super.get(id);
  }

  edit(id: number, category_data: CategoryData): void {
    let categoryData: CategoryData = this.prepareCategoryData(category_data);
    super.edit(id, categoryData);
  }

  delete(id: number): void {
    super.delete(id);
  }

  private prepareCategoryData(category_data?: CategoryData): CategoryData {
    let category_body: CategoryData = {
      parent_id: 1,
      translations: {
        pl_PL: {
          active: true,
          name: "category_" + this.RANDOM_NUMBER,
        },
      },
    };
    return { ...category_body, ...category_data };
  }
}

export default CategoryApiFeature;
