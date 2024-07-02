import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  console.log(userPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `/api/post/getposts?userId=${currentUser._id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.status === 200) {
          setUserPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) fetchPosts();
  }, [currentUser._id]);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span className="">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map(
            (post, index) => (
              console.log(post),
              (
                <Table.Body key={index} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    {/* DATE UPDATED */}
                    <Table.Cell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    {/* IMAGE */}
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-20 h-10 object-cover bg-gray-500"
                        />
                      </Link>
                    </Table.Cell>
                    {/* TITLE */}
                    <Table.Cell>
                      <Link
                        to={`/post/${post.slug}`}
                        className="font-medium text-gray-900 dark:text-white"
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    {/* CATEGORY */}
                    <Table.Cell>
                      <span className="">{post.category}</span>
                    </Table.Cell>
                    {/* DELETE */}
                    <Table.Cell>
                      <span className="text-red-500 font-medium hover:underline cursor-pointer">
                        Delete
                      </span>
                    </Table.Cell>
                    {/* EDIT */}
                    <Table.Cell>
                      <Link
                        to={`/update-post/${post._id}`}
                        className="text-blue-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              )
            )
          )}
        </Table>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
}

export default DashPosts;
