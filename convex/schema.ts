import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tokenSets: defineTable({
    name: v.string(),
    slug: v.string(),
    brandColor: v.string(),
    baseFontSize: v.number(),
    typeRatio: v.number(),
    baseSpacingUnit: v.number(),
  }).index("by_slug", ["slug"]),

  tokenHistory: defineTable({
    tokenSetId: v.id("tokenSets"),
    brandColor: v.string(),
    baseFontSize: v.number(),
    typeRatio: v.number(),
    baseSpacingUnit: v.number(),
  }).index("by_tokenSetId", ["tokenSetId"]),
});
