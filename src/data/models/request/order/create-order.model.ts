import { OrderType } from "@/data/enums/order-type.enum";
import { VehicleType } from "@/data/enums/vehicle-type.enum";

export interface CreateOrderRequestModel {
  orderType?: OrderType;

  sourceAddress?: string;
  sourceLat?: number;
  sourceLong?: number;

  targetAddress?: string;
  targetLat?: number;
  targetLong?: number;

  isPickup?: boolean;
  totalPackageCount?: number;

  totalWeight?: number;
  vehicleType?: VehicleType;
  price?: number;
  isReservationRequired?: boolean;
}
