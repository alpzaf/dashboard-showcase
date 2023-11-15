import { http, HttpResponse } from "msw";
import { nanoid } from "@reduxjs/toolkit";
import { Post } from "../services/posts";
import { state } from "./entity";

// We're just going to use a simple in-memory store for both the counter and posts
// The entity adapter will handle modifications when triggered by the MSW handlers

let count = 0;
let startingId = 3; // Just a silly counter for usage when adding new posts

// Just use a random id for an auth token
const token = nanoid();

export const handlers = [
  http.get("/time/:offset", ({ request }) => {
    const { offset } = request as { offset?: string };
    const date = new Date();
    const localDate = date.getTime(); // users local time
    const localOffset = date.getTimezoneOffset() * 60000;
    const formattedOffset = Number(offset.replace(":", "."));
    const target = localDate + localOffset + 3600000 * formattedOffset;
    return HttpResponse.json({
      isSuccess: true,
      data: [],
      time: new Date(target).toUTCString(),
    });
  }),

  http.put<{ amount: number }>("/increment", (req, res, ctx) => {
    const { amount } = req.body;
    count = count += amount;

    return res(ctx.json({ count }));
  }),

  http.put<{ amount: number }>("/decrement", (req, res, ctx) => {
    const { amount } = req.body;
    count = count -= amount;

    return res(ctx.json({ count }));
  }),

  http.get("/count", (req, res, ctx) => {
    return res(ctx.json({ count }));
  }),

  http.post("/login", (req, res, ctx) => {
    return res.once(ctx.json({ message: "i fail once" }), ctx.status(500));
  }),
  http.post("/login", (req, res, ctx) => {
    return res(
      ctx.json({ token, user: { first_name: "Test", last_name: "User" } })
    );
  }),

  http.get("/posts", (req, res, ctx) => {
    return res(ctx.json(Object.values(state.entities)));
  }),

  http.post("/posts", (req, res, ctx) => {
    let post = req.body as Partial<Post>;
    startingId += 1;
    state = adapter.addOne(state, { ...post, id: startingId } as Post);
    return res(ctx.json(Object.values(state.entities)), ctx.delay(400));
  }),

  http.get("/posts/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    state = adapter.updateOne(state, {
      id,
      changes: { fetched_at: new Date().toUTCString() },
    });
    return res(ctx.json(state.entities[id]), ctx.delay(400));
  }),

  http.put("/posts/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };
    const changes = req.body as Partial<Post>;

    state = adapter.updateOne(state, { id, changes });

    return res(ctx.json(state.entities[id]), ctx.delay(400));
  }),

  http.delete("/posts/:id", (req, res, ctx) => {
    const { id } = req.params as { id: string };

    state = adapter.removeOne(state, id);

    return res(
      ctx.json({
        id,
        success: true,
      }),
      ctx.delay(600)
    );
  }),

  http.get("/error-prone", (req, res, ctx) => {
    if (Math.random() > 0.1) {
      return res(ctx.json({ error: "failed!" }), ctx.status(500));
    }
    return res(
      ctx.json({
        success: true,
      })
    );
  }),
];
