import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";

function PostPage() {
  const { postslug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(`/api/post/getposts?slug=${postslug}`);
        console.log(res);
        if (res.status === 200) {
          setPost(res.data.posts[0]);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postslug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );

  if (error) return <div>Something went wrong</div>;
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-serif mx-auto max-w-2xl lg:text-4xl">
        {post && post.title}
      </h1>{" "}
      6.
      <Link
        to={`/search?category=${post && post.category && post.category}`}
        className="self-center mt-5"
      >
        <Button color={"gray"} pill size={"xs"}>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className=" mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl test-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        {/* <span>
          {post && (post.content.length / 1000).toFixed(0) + 1 }{" "}mins read
        </span> */}
      </div>
      <div
        className="prose mt-5 max-w-2xl mx-auto post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
}

export default PostPage;
