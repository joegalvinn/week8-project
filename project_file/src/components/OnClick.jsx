"use client";

import * as React from "react";

export default function OnClick({ reviews }) {
  const handleRowClick = (id) => {
    window.location.href = `/reviewsPage/${id}`;
  };

  return (
    <div className="returnDataContainer">
      {reviews.map((review) => (
        <div
          key={review.id}
          onClick={() => handleRowClick(review.id)}
          style={{ cursor: "pointer" }}
          className="border-lime-700 border-2 flex flex-col items-center"
        >
          <h2>{review.gadget_name}</h2>
          <h3>{review.review}</h3>
          <h3>{review.reviewer_name}</h3>
          <img
            src={review.image_url}
            alt={review.gadget_name}
            className="review-image"
          />
        </div>
      ))}
    </div>
  );
}
