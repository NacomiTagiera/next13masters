import { getReviewsByProductId } from "../../reviewsList/api/fetchQueries";
import { ReviewsListItem } from "../../reviewsList/components/ReviewsListItem";

export const ReviewsList = async ({ productId }: { productId: string }) => {
	const reviews = await getReviewsByProductId(productId);

	return (
		<section className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
			<h3 className="mb-10 text-2xl font-bold tracking-tight md:text-3xl">
				Customer reviews
				<span className="ms-1 text-sm text-zinc-600">({reviews.length})</span>
			</h3>
			{reviews.length > 0 ? (
				<div className="space-y-10">
					{reviews.map((review) => (
						<ReviewsListItem key={review.id} review={review} />
					))}
				</div>
			) : (
				<p className="py-10 text-center text-lg text-zinc-600">
					No reviews yet. Be the first to review this product!
				</p>
			)}
		</section>
	);
};
