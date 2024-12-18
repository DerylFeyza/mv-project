"use client";
import React from 'react';
import Image from "next/image";
import { Company } from "@/app/types/companies";
import Link from "next/link";
import { getCompanyTags } from "@/app/services/companies";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../(main)/components/button";
import { Tags } from "@/app/types/tags";
import ServiceCardSkeleton from "./ServiceCardSkeleton";

interface ServiceCardProps {
  CompanyData?: Company;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ CompanyData }) => {
  const { data: tags, isLoading, error } = useQuery({
    queryKey: ["company_tags", CompanyData?.id],
    queryFn: () => CompanyData ? getCompanyTags(CompanyData.id) : Promise.resolve([]),
    enabled: !!CompanyData,
  });

  if (!CompanyData) {
    return <ServiceCardSkeleton />;
  }

  if (isLoading) {
    return <ServiceCardSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-[30px] shadow-sm w-[341px] h-[393px] flex items-center justify-center">
        <p className="text-red-500">Error: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[30px] shadow-lg w-[341px] h-[393px] relative">
      <div className="flex flex-col items-center gap-4 h-full">
        <div className="w-24 h-24">
          {CompanyData.company_image ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${CompanyData.company_image}?access_token=${process.env.NEXT_PUBLIC_DIRECTUS_TOKEN}`}
              alt={CompanyData.company_name}
              width={96}
              height={96}
              className="rounded-lg object-cover w-full h-full"
            />
          ) : (
            <div className="bg-gray-200 w-24 h-24 rounded-lg animate-pulse" />
          )}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">{CompanyData.company_name}</h3>
          <p className="text-gray-600 text-sm">{CompanyData.description}</p>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {tags.map((tag: Tags) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
              >
                {tag.tags}
              </span>
            ))}
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500 block">Highest bid</span>
            <span className="font-semibold">$500</span>
          </div>
          <Link href={`/companies/explore/${CompanyData.id}`}>
            <Button
              variant="tertiary"
              className="text-purple-600 bg-white hover:bg-violet-100 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              See Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ServiceCard;