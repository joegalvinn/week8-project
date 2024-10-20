import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as React from "react";
import OnClick from "@/components/OnClick";
import "./reviews.css";

//navigaton
//metadata

export default async function NewReview() {
  //here i need to handle the submit of the post form
  async function handleSubmit(formValues) {
    "use server";
    const formData = {
      gadget_name: formValues.get("gadget_name"),
      reviewer_name: formValues.get("reviewer_name"),
      review: formValues.get("review"),
      price: formValues.get("price"),
      rating: formValues.get("rating"),
      image_url: formValues.get("image_url"),
    };
    console.log(formData);

    await db.query(
      `INSERT INTO reviews (gadget_name, reviewer_name, review, price, rating, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        formData.gadget_name,
        formData.reviewer_name,
        formData.review,
        formData.price,
        formData.rating,
        formData.image_url,
      ]
    );
    revalidatePath("/reviewsPage");
  }

  const reviews = await db.query(`SELECT * FROM reviews`);
  console.log(reviews);
  const wrangledReviews = reviews.rows;

  return (
    <div className="formContainer">
      <div className="rightBar neon-glow">
        <h1 className="text-center text-xl font-bold neon-text form-spacing">
          Add a review
        </h1>

        <form action={handleSubmit} className="space-y-4">
          <div className="form-spacing">
            <label htmlFor="gadget_name" className="block neon-text">
              Gadget name:
            </label>
            <input
              type="text"
              name="gadget_name"
              id="gadget_name"
              required
              className="neon-input"
            />
          </div>
          <div className="form-spacing">
            <label htmlFor="reviewer_name" className="block neon-text">
              Your name:
            </label>
            <input
              type="text"
              name="reviewer_name"
              id="reviewer_name"
              required
              className="neon-input"
            />
          </div>

          <div className="form-spacing">
            <label htmlFor="review" className="block neon-text">
              Review:
            </label>
            <textarea
              name="review"
              id="review"
              required
              className="neon-input"
            />
          </div>

          <div className="form-spacing">
            <label htmlFor="price" className="block neon-text">
              Price (£):
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              id="price"
              required
              className="neon-input"
            />
          </div>

          <div className="form-spacing">
            <label htmlFor="rating" className="block neon-text">
              Rating:
            </label>
            <select id="rating" name="rating" required className="neon-input">
              <option value="" disabled>
                Select Rating
              </option>
              <option value="★">★</option>
              <option value="★★">★★</option>
              <option value="★★★">★★★</option>
              <option value="★★★★">★★★★</option>
              <option value="★★★★★">★★★★★</option>
            </select>
          </div>

          <div className="form-spacing">
            <label htmlFor="image_url" className="block neon-text">
              Add image:
            </label>
            <input
              type="text"
              name="image_url"
              id="image_url"
              required
              className="neon-input"
            />
          </div>

          <button type="submit" className="neon-button">
            Add Review
          </button>
        </form>
      </div>
      <OnClick reviews={wrangledReviews} />
    </div>
  );
}
