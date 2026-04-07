import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tokenSets")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tokenSets").order("desc").take(20);
  },
});

export const getHistory = query({
  args: { tokenSetId: v.id("tokenSets") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tokenHistory")
      .withIndex("by_tokenSetId", (q) => q.eq("tokenSetId", args.tokenSetId))
      .order("desc")
      .take(20);
  },
});

export const save = mutation({
  args: {
    name: v.string(),
    brandColor: v.string(),
    baseFontSize: v.number(),
    typeRatio: v.number(),
    baseSpacingUnit: v.number(),
  },
  handler: async (ctx, args) => {
    const slug = slugify(args.name);
    const existing = await ctx.db
      .query("tokenSets")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    let tokenSetId;
    if (existing) {
      await ctx.db.patch(existing._id, {
        brandColor: args.brandColor,
        baseFontSize: args.baseFontSize,
        typeRatio: args.typeRatio,
        baseSpacingUnit: args.baseSpacingUnit,
      });
      tokenSetId = existing._id;
    } else {
      tokenSetId = await ctx.db.insert("tokenSets", {
        name: args.name,
        slug,
        brandColor: args.brandColor,
        baseFontSize: args.baseFontSize,
        typeRatio: args.typeRatio,
        baseSpacingUnit: args.baseSpacingUnit,
      });
    }

    await ctx.db.insert("tokenHistory", {
      tokenSetId,
      brandColor: args.brandColor,
      baseFontSize: args.baseFontSize,
      typeRatio: args.typeRatio,
      baseSpacingUnit: args.baseSpacingUnit,
    });

    return { slug, tokenSetId };
  },
});
