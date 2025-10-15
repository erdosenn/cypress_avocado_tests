import AbstractFeature from "./AbstractFeature";
import { CategoryData, ProductData } from "../dataType/dataType";
import { generateRandomNumber } from "../../../dataGenerators";

class ProductApiFeature extends AbstractFeature {
  public readonly URI: string = "/products";

  create(product_data: ProductData) {
    let productData: CategoryData = this.prepareProductData(product_data);
    return super.create(productData);
  }

  get(id: number) {
    return super.get(id);
  }

  edit(id: number, product_data: ProductData): void {
    return super.edit(id, product_data);
  }

  delete(id: number): void {
    return super.delete(id);
  }

  private prepareProductData(product_data?: ProductData): ProductData {
    let product_body: ProductData = {
      category_id: 1,
      code: "",
      pkwiu: "",
      stock: { price: generateRandomNumber(10, 100, 2), stock: 10 },
      translations: {
        pl_PL: {
          active: true,
          name: "product_" + this.RANDOM_NUMBER,
        },
      },
    };
    return { ...product_body, ...product_data };
  }
}

export default ProductApiFeature;
