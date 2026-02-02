import { z } from 'zod';

export const reviewSchema = z.object({
  id: z.number(),
  reviewerName: z.string(),
  reviewTitle: z.string(),
  reviewContent: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;

export const reviewPopupSettingSchema = z.object({
  id: z.number(),
  isReviewPopupOn: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ReviewPopupSetting = z.infer<typeof reviewPopupSettingSchema>;

export const updateReviewPopupSettingSchema = z.object({
  isReviewPopupOn: z.boolean(),
});

export type UpdateReviewPopupSettingInput = z.infer<typeof updateReviewPopupSettingSchema>;
