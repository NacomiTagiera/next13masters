import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getCategoryBySlug } from "@/api/categories";
import { getProductsCountInCategory } from "@/api/products";
import { ProductList } from "@/components/Products/ProductList";
import { PRODUCTS_PAGE_SIZE } from "@/lib/constants";

type Props = {
	params: { category: string; pageNumber: string };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
	const category = await getCategoryBySlug(params.category, 1);

	return {
		title: category?.name,
		description: category?.description,
	};
};

export default async function CategoryPage({ params }: Props) {
	const category = await getCategoryBySlug(params.category, +params.pageNumber);
	const productsCount = await getProductsCountInCategory(params.category);

	if (!category?.products.length) {
		return notFound();
	}

	const numberOfPages = Math.ceil(productsCount / PRODUCTS_PAGE_SIZE);

	return (
		<>
			<h2>{category.name}</h2>
			<p>{category.description}</p>
			<ProductList
				products={category.products}
				href={`/categories/${params.category}`}
				numberOfPages={numberOfPages}
			/>
		</>
	);
}