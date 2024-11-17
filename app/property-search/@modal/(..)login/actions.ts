"use server";

import { revalidatePath } from "next/cache";

export const loginSuccess = async () => {
  revalidatePath("/property-search");
};
