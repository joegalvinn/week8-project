"use client";

import * as React from "react";

export default function OnClickDelete({ comments, handleDelete }) {
  return (
    <div className="commentsContainer">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-teal-700 border-2 flex flex-col items-center"
        >
          <h2>{comment.name}</h2>
          <p>{comment.comment}</p>
          <button onClick={() => handleDelete(comment.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
