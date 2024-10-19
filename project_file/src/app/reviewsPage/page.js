import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as React from "react";
import OnClick from "@/components/OnClick";

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
      <div className="bg-black text-white">
        <h1>Add a review</h1>

        <form
          action={handleSubmit}
        >
          <label htmlFor="gadget_name">Gadget name:</label>
          <input
            type="text"
            name="gadget_name"
            id="gadget_name"
            required
            className="bg-black text-white"
          />

          <label htmlFor="reviewer_name">Your name: </label>
          <input
            type="text"
            name="reviewer_name"
            id="reviewer_name"
            required
            className="bg-black text-white"
          />

          <label htmlFor="review">Review: </label>
          <textarea
            type="text"
            name="review"
            id="review"
            required
            className="bg-black text-white"
          />

          <label htmlFor="price">Price (£): </label>
          <input
            type="number"
            step="0.01"
            min="0"
            name="price"
            id="price"
            required
            className="bg-black text-white"
          />

          <label htmlFor="rating">Rating: </label>
          <select type="text" id="rating" name="rating" required>
            <option value="" disabled>
              Select Rating
            </option>
            <option value="★">★</option>
            <option value="★★">★★</option>
            <option value="★★★">★★★</option>
            <option value="★★★★">★★★★</option>
            <option value="★★★★★">★★★★★</option>
          </select>

          <label htmlFor="image_url">Add image: </label>
          <input
            type="text"
            name="image_url"
            id="image_url"
            required
            className="bg-black text-white"
          />
          <button
            type="submit"
            className=" bg-orange-800 border-amber-400 border-4 rounded-sm"
          >
            Add Review
          </button>
        </form>
      </div>
      <OnClick reviews={wrangledReviews} />
    </div>
  );
}
