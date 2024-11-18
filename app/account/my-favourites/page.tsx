import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserFavourites } from "@/data/favourites";
import { getPropertiesById } from "@/data/properties";
import { EyeIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import RemoveFavouriteButton from "./remove-favourite-button";
import { redirect } from "next/navigation";

export default async function MyFavourites({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const searchParamsValues = await searchParams;
  const page = searchParamsValues?.page ? parseInt(searchParamsValues.page) : 1;
  const pageSize = 2;
  const favourites = await getUserFavourites();
  const allFavourites = Object.keys(favourites);
  const totalPages = Math.ceil(allFavourites.length / pageSize);

  const paginatedFavourites = allFavourites.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (!paginatedFavourites.length && page > 1) {
    redirect(`/account/my-favourites?page=${totalPages}`);
  }

  const properties = await getPropertiesById(paginatedFavourites);
  console.log({ paginatedFavourites, properties });

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-4xl font-bold py-4 mt-5">My favourites</h1>
      {!paginatedFavourites.length && (
        <h2 className="text-center text-zinc-400 text-3xl font-bold py-10">
          You have no favourited properties.
        </h2>
      )}
      {!!paginatedFavourites.length && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFavourites.map((favourite) => {
              const property = properties.find(
                (property) => property.id === favourite
              );
              const address = [
                property?.address1,
                property?.address2,
                property?.city,
                property?.postcode,
              ]
                .filter((addressLine) => !!addressLine)
                .join(", ");

              return (
                <TableRow key={favourite}>
                  <TableCell>{address}</TableCell>
                  <TableCell>
                    {!!property && (
                      <PropertyStatusBadge status={property?.status} />
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end gap-1">
                    {!!property && (
                      <>
                        <Button asChild variant="outline">
                          <Link href={`/property/${property.id}`}>
                            <EyeIcon />
                          </Link>
                        </Button>
                        <RemoveFavouriteButton propertyId={property.id} />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                {Array.from({ length: totalPages }).map((_, i) => {
                  return (
                    <Button
                      disabled={page === i + 1}
                      key={i}
                      asChild={page !== i + 1}
                      variant="outline"
                      className="mx-1"
                    >
                      <Link href={`/account/my-favourites?page=${i + 1}`}>
                        {i + 1}
                      </Link>
                    </Button>
                  );
                })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
