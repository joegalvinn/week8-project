"use client";
import "./onclickdelete.css";
import * as React from "react";

export default function OnClickDelete({ comments, handleDelete }) {
  return (
    <div className="commentsContainer">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-cyan-400 border-2 flex flex-col items-center"
        >
          <h2>{comment.name}</h2>
          <p>{comment.comment}</p>
          <button
            className="deleteButton"
            onClick={() => handleDelete(comment.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
