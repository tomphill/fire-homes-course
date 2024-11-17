"use client";

import { HeartIcon } from "lucide-react";
import { addFavourite, removeFavourite } from "./actions";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ToggleFavouriteButton({
  propertyId,
  isFavourite,
}: {
  propertyId: string;
  isFavourite: boolean;
}) {
  const { toast } = useToast();
  const auth = useAuth();
  const router = useRouter();
  return (
    <button
      className="absolute top-0 right-0 z-10 p-2 bg-white rounded-bl-lg"
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) {
          router.push("/login");
          return;
        }
        if (isFavourite) {
          await removeFavourite(propertyId, tokenResult.token);
        } else {
          await addFavourite(propertyId, tokenResult.token);
        }

        toast({
          title: `Property ${
            isFavourite ? "removed from" : "added to"
          } favourites`,
          variant: "success",
        });

        router.refresh();
      }}
    >
      <HeartIcon
        className="text-black"
        fill={isFavourite ? "#db2777" : "white"}
      />
    </button>
  );
}
