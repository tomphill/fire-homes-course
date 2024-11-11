"use server";

import { auth, firestore } from "@/firebase/server";
import { z } from "zod";

export const savePropertyImages = async (
  {
    propertyId,
    images,
  }: {
    propertyId: string;
    images: string[];
  },
  authToken: string
) => {
  const verifiedToken = await auth.verifyIdToken(authToken);

  if (!verifiedToken.admin) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  const schema = z.object({
    propertyId: z.string(),
    images: z.array(z.string()),
  });

  const validation = schema.safeParse({ propertyId, images });
  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  await firestore.collection("properties").doc(propertyId).update({
    images,
  });
};
