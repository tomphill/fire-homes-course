import { firestore, getTotalPages } from "@/firebase/server";
import { Property } from "@/types/property";
import { PropertyStatus } from "@/types/propertyStatus";
import "server-only";

type GetPropertiesOptions = {
  filters?: {
    minPrice?: number | null;
    maxPrice?: number | null;
    minBedrooms?: number | null;
    status?: PropertyStatus[] | null;
  };
  pagination?: {
    pageSize?: number;
    page?: number;
  };
};

export const getProperties = async (options?: GetPropertiesOptions) => {
  const page = options?.pagination?.page || 1;
  const pageSize = options?.pagination?.pageSize || 10;
  const { minPrice, maxPrice, minBedrooms, status } = options?.filters || {};

  let propertiesQuery = firestore
    .collection("properties")
    .orderBy("updated", "desc");

  if (minPrice !== null && minPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
  }

  if (maxPrice !== null && maxPrice !== undefined) {
    propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
  }

  if (minBedrooms !== null && minBedrooms !== undefined) {
    propertiesQuery = propertiesQuery.where("bedrooms", ">=", minBedrooms);
  }

  if (status) {
    propertiesQuery = propertiesQuery.where("status", "in", status);
  }

  const totalPages = await getTotalPages(propertiesQuery, pageSize);

  const propertiesSnapshot = await propertiesQuery
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .get();

  const properties = propertiesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Property)
  );

  return { data: properties, totalPages };
};

export const getPropertyById = async (propertyId: string) => {
  const propertySnapshot = await firestore
    .collection("properties")
    .doc(propertyId)
    .get();

  const propertyData = {
    id: propertySnapshot.id,
    ...propertySnapshot.data(),
  } as Property;
  return propertyData;
};

export const getPropertiesById = async (propertyIds: string[]) => {
  if (!propertyIds.length) {
    return [];
  }
  const propertiesSnapshot = await firestore
    .collection("properties")
    .where("__name__", "in", propertyIds)
    .get();

  const propertiesData = propertiesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Property)
  );
  return propertiesData;
};
