import { createEntityAdapter } from "@reduxjs/toolkit";
import { Post } from "@/services/posts";

const adapter = createEntityAdapter<Post>();
const orders = createEntityAdapter();

let state = adapter.getInitialState();
state = adapter.setAll(state, [
  { id: 1, name: "A sample post", fetched_at: new Date().toUTCString() },
  {
    id: 2,
    name: "A post about rtk-query",
    fetched_at: new Date().toUTCString(),
  },
]);

let ordersEntity = orders.getInitialState();
ordersEntity = orders.setAll(ordersEntity, [
  {
    id: 4,
    refNo: "",
    barcode: "",
    orderType: 2,
    orderStatus: 0,

    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString(),

    cost: 15,

    sourceAddress: "",
    sourceLat: 41.29,
    sourceLong: 28.56,

    targetAddress: "",
    targetLat: 41.29,
    targetLong: 28.56,

    isPickup: false,
    totalPackageCount: 2,

    totalWeight: 10,
    vehicleType: 2,
    price: 5,
    isReservationRequired: false,
    isSmsRequired: false,
  },
  {
    id: 5,
    refNo: "",
    barcode: "",
    orderType: 2,
    orderStatus: 0,

    startDate: new Date().toUTCString(),
    endDate: new Date().toUTCString(),

    cost: 15,

    sourceAddress: "",
    sourceLat: 41.29,
    sourceLong: 28.56,

    targetAddress: "",
    targetLat: 41.29,
    targetLong: 28.56,

    isPickup: false,
    totalPackageCount: 2,

    totalWeight: 10,
    vehicleType: 2,
    price: 5,
    isReservationRequired: false,
    isSmsRequired: false,
  },
]);

export { state, ordersEntity };
