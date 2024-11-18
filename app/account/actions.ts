"use server";

import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";

export const deleteUserFavourites = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    await firestore.collection("favourites").doc(decodedToken.uid).delete();
  } catch (e) {}
};
