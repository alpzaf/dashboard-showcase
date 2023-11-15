import { BaseModel } from "@/data/base/base.model";
import { OrderType } from "@/data/enums/order-type.enum";
import { VehicleType } from "@/data/enums/vehicle-type.enum";

export interface OrderDetailResponseModel extends BaseModel {
  refNo: string;

  barcode: string;
  orderType: OrderType;
  orderStatus: number;

  startDate: Date;
  endDate: Date;

  cost: number;

  sourceAddress: string;
  sourceLat: number;
  sourceLong: number;

  targetAddress: string;
  targetLat: number;
  targetLong: number;

  isPickup: boolean;
  totalPackageCount: number;

  totalWeight: number;
  vehicleType: VehicleType;
  price: number;
  isReservationRequired: boolean;
  isSmsRequired: boolean;
}
