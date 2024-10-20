import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import OnClickDelete from "@/components/OnClickDelete";
import "./detailedReviews.css";

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
        <div key={review.id} className="flex flex-col items-center">
          <h2 className="name">{review.gadget_name}</h2>
          <h2 className="rating">{review.rating}</h2>
          <h3 className="review">"{review.review}"</h3>
          <h3 className="price">£{review.price}</h3>
          <h3 className="reviewer">
            <i>{review.reviewer_name}</i>
          </h3>
          <img
            src={review.image_url}
            alt={review.gadget_name}
            className="review-image"
          />
        </div>
      </div>

      <div className="dButton">
        <OnClickDelete
          comments={wrangledComments}
          handleDelete={handleDelete}
        />
      </div>

      <div className="commentForm">
        <h1 className="neon-text neon-glow commentHeader">Add a Review</h1>{" "}
        {/* Updated heading */}
        <form action={handleSubmit}>
          <div className="form-spacing">
            <label htmlFor="name" className="neon-text">
              Username:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="neon-input"
            />
          </div>

          <div className="form-spacing">
            <label htmlFor="comment" className="neon-text">
              Comment:
            </label>
            <input
              type="text"
              name="comment"
              id="comment"
              required
              className="neon-input"
            />
          </div>

          <button type="submit" className="neon-button">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}
