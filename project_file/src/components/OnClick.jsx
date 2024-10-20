"use client";
import "./onclick.css";
import * as React from "react";

export default function OnClick({ reviews }) {
  const handleRowClick = (id) => {
    window.location.href = `/reviewsPage/${id}`;
  };

  return (
    <div className="returnDataContainer">
      <div className="individualContainer">
        {reviews.map((review) => (
          <div
            key={review.id}
            onClick={() => handleRowClick(review.id)}
            style={{ cursor: "pointer" }}
            className="flex flex-col items-center"
          >
            <h2 className="text-xl mb-3">
              <b>{review.gadget_name}</b>
            </h2>
            <h3>
              "<i>{review.review}</i>"
            </h3>
            <h3 className="mt-3">{review.reviewer_name}</h3>
            <img
              src={review.image_url}
              alt={review.gadget_name}
              className="review-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
