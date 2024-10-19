import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import OnClickDelete from "@/components/OnClickDelete";

export default async function detailedReview({ params }) {
  const { id } = params;

  async function handleSubmit(formValues) {
    "use server";
    const formData = {
      name: formValues.get("name"),
      comment: formValues.get("comment"),
    };
    console.log(formData);

    await db.query(
      `INSERT INTO comment_table (review_id, name, comment)
        VALUES ($1, $2, $3)`,
      [id, formData.name, formData.comment]
    );
    revalidatePath(`/reviewsPage/${id}`);
  }

  async function handleDelete(commentId) {
    "use server";
    await db.query(`DELETE FROM comment_table WHERE id = $1`, [commentId]);
    revalidatePath(`/reviewsPage/${id}`);
  }

  const reviews = await db.query(`SELECT * FROM reviews WHERE id = $1`, [id]);
  console.log(reviews);
  const review = reviews.rows[0];

  const comments = await db.query(
    `SELECT * FROM comment_table WHERE review_id = $1`,
    [id]
  );
  console.log(comments);
  const wrangledComments = comments.rows;

  return (
    <div>
      <div className="returnDetailedDataContainer">
        <div
          key={review.id}
          className="border-lime-700 border-2 flex flex-col items-center"
        >
          <h2>{review.gadget_name}</h2>
          <h2>{review.rating}</h2>
          <h3>{review.review}</h3>
          <h3>£{review.price}</h3>
          <h3>{review.reviewer_name}</h3>
          <img
            src={review.image_url}
            alt={review.gadget_name}
            className="review-image"
          />
        </div>
      </div>

      <div>
        <OnClickDelete
          comments={wrangledComments}
          handleDelete={handleDelete}
        />
      </div>

      <div className="commentForm">
        <h1>Add a review</h1>

        <form action={handleSubmit}>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="bg-black text-white"
          />

          <label htmlFor="comment">Comment: </label>
          <input
            type="text"
            name="comment"
            id="comment"
            required
            className="bg-black text-white"
          />

          <button
            type="submit"
            className=" bg-orange-800 border-amber-400 border-4 rounded-sm"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}
