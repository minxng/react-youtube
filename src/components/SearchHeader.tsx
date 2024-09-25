import React, { useEffect, useState } from "react";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function SearchHeader() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { keyword } = useParams();
  useEffect(() => setText(keyword || ""), [keyword]);
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };
  return (
    <header className="w-full p-4 border-b border-zinc-600 mb-4 flex">
      <Link to="/" className="flex items-center">
        <BsYoutube className="text-4xl text-brand" />
        <h1 className="font-bold ml-2 text-3xl">Youtube</h1>
      </Link>
      <form className="w-full flex justify-center " onSubmit={handleOnSubmit}>
        <input
          className="w-7/12 px-4 py-2 outline-none border rounded-l-full border-zinc-400 text-zinc-900 "
          type="text"
          placeholder="Search..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="px-4 border rounded-r-full border-zinc-400 border-l-0">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
