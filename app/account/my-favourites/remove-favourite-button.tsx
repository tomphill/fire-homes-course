"use client";

import { removeFavourite } from "@/app/property-search/actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RemoveFavouriteButton({
  propertyId,
}: {
  propertyId: string;
}) {
  const auth = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  return (
    <Button
      variant="outline"
      onClick={async () => {
        const tokenResult = await auth?.currentUser?.getIdTokenResult();
        if (!tokenResult) {
          return;
        }
        await removeFavourite(propertyId, tokenResult.token);
        toast({
          title: "Property removed from favourites",
          variant: "success",
        });
        router.refresh();
      }}
    >
      <Trash2Icon />
    </Button>
  );
}
