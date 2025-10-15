import AbstractFeature from "./AbstractFeature";
import { OrderData, ProductData } from "../dataType/dataType";

class OrderApiFeature extends AbstractFeature {
  public readonly URI: string = "/categories";

  public edit(id: number, orderData: OrderData): void {
    super.edit(id, orderData);
  }

  public delete(id: number): void {
    super.delete(id);
  }

  private prepareOrderData(orderData: OrderData): OrderData {
    let orderBody: OrderData = {
      status_id: 3,
    };
    return { ...orderBody, ...orderData };
  }
}

export default OrderApiFeature;
