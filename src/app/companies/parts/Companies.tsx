"use client";
import React from "react";
import Card from "../components/Card";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/app/services/companies";
import { Company } from "@/app/types/companies";
export default function FindCompanies() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["company_data"],
		queryFn: () => getCompanies(10, 1),
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<section className="py-16 bg-gray-100">
			<div className="container mx-auto px-4">
				<h2 className="text-gray-500 mb-2">The companies work!</h2>
				<h1 className="text-4xl font-bold mb-8">
					Find <span className="text-purple-600">Companies</span>
				</h1>
				<div className="flex flex-wrap justify-center gap-8">
					{data.map((data: Company, index: number) => (
						<Card key={index} CompanyData={data} />
					))}
				</div>
			</div>
		</section>
	);
}
