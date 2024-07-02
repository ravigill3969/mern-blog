import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";

function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdDelete, setPostIdDelete] = useState('');
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `/api/post/getposts?userId=${currentUser._id}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setUserPosts(res.data.posts);
          if (res.data.posts.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) fetchPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await axios.get(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUserPosts([...userPosts, ...res.data.posts]);
        if (res.data.posts.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `/api/post/deletepost/${postIdDelete}/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUserPosts((prev)=>prev.filter((post)=>post._id !== postIdDelete));
        console.log("congrats its deleted")
      }else{
        console.log(res.message)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
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
                        <span onClick={()=>{
                          setShowModal(true)
                          setPostIdDelete(post._id)
                        }} className="text-red-500 font-medium hover:underline cursor-pointer">
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
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
          <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header>Delete Post</Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            gradientDuoTone="redToOrange"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button gradientDuoTone="orangeToRed" onClick={handleDeletePost}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
    </div>
  );
}

export default DashPosts;
