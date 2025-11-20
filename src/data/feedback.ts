"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface CreateFeedbackInput {
  message: string;
  username?: string;
  platform?: "X" | "IG";
}

export async function createFeedback(input: CreateFeedbackInput) {
  const { message, username, platform } = input;

  if (!message || message.trim().length === 0) {
    throw new Error("Message is required");
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        message,
        username: username || null,
        platform: platform || null,
      },
    });

    revalidatePath("/feedback");
    return { success: true, data: feedback };
  } catch (error) {
    console.error("Failed to create feedback:", error);
    return { success: false, error: "Failed to create feedback" };
  }
}

export async function getFeedbacks(limit = 100) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
    return { success: true, data: feedbacks };
  } catch (error) {
    console.error("Failed to fetch feedbacks:", error);
    return { success: false, data: [] };
  }
}

export async function getTopFeedbacks(limit = 2) {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: [
        {
          upvotes: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      take: limit,
    });
    return { success: true, data: feedbacks };
  } catch (error) {
    console.error("Failed to fetch top feedbacks:", error);
    return { success: false, data: [] };
  }
}

export async function upvoteFeedback(id: string) {
  try {
    const feedback = await prisma.feedback.update({
      where: { id },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });

    revalidatePath("/feedback");
    return { success: true, data: feedback };
  } catch (error) {
    console.error("Failed to upvote feedback:", error);
    return { success: false, error: "Failed to upvote feedback" };
  }
}
