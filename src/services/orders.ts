import { OrderDetailResponseModel } from "@/data/models/response/order/order-detail.model";
import { CreateOrderRequestModel } from "@/data/models/request/order/create-order.model";
import { ApiResult } from "@/data/base/api-result.model";
import { api } from "./api";

export type OrdersResponse = OrderDetailResponseModel[];

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOrders: build.query<OrdersResponse, void>({
      query: () => ({ url: "orders" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Orders", id } as const)),
        { type: "Orders" as const, id: "LIST" },
      ],
    }),
    addOrder: build.mutation<
      ApiResult<{ message: string }>,
      CreateOrderRequestModel
    >({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
    getOrder: build.query<OrderDetailResponseModel, number>({
      query: (id) => `orders/${id}`,
      providesTags: (_order, _err, id) => [{ type: "Orders", id }],
    }),
    updateOrder: build.mutation<
      OrderDetailResponseModel,
      Partial<OrderDetailResponseModel>
    >({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `orders/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (order) => [{ type: "Orders", id: order?.id }],
    }),
    deleteOrder: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (order) => [{ type: "Orders", id: order?.id }],
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => "error-prone",
    }),
  }),
});

export const {
  useAddOrderMutation,
  useDeleteOrderMutation,
  useGetOrderQuery,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useGetErrorProneQuery,
} = ordersApi;

export const {
  endpoints: { getOrder },
} = ordersApi;
