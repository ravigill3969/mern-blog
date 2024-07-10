import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users,setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
//   const [userIdDelete, setUserIdDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `/api/user/getusers`,
          {
            withCredentials: true,
          }
        );
        console.log(res)
        if (res.status === 200) {
          setUsers(res.data.users);
          if (res.data.users.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) fetchUsers();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await axios.get(
        `/api/user/getusers?startIndex=${startIndex}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUsers([...users, ...res.data.users]);
        if (res.data.users.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

    const handleDeleteUser = async () => {}


  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {users.map((user, index) => (
              <Table.Body key={index} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  {/* DATE UPDATED */}
                  <Table.Cell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  {/* IMAGE */}
                  <Table.Cell>
                    <Link to={`/user/${user.slug}`}>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  {/* TITLE */}
                  <Table.Cell>
                    <Link
                      to={`/user/${user.slug}`}
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      {user.username}
                    </Link>
                  </Table.Cell>
                  {/* CATEGORY */}
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin ? (<FaCheck className="text-green-500"/>) : (<FaTimes className="text-red-500"/>)}</Table.Cell>
                  {/* DELETE */}
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUsers(users._id);
                      }}
                      className="text-red-500 font-medium hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  {/* EDIT */}
                  <Table.Cell>
                    <Link
                      to={`/update-user/${user._id}`}
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
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
            <Modal.Header>Delete user</Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </Modal.Body>
            <Modal.Footer>
              <Button
                gradientDuoTone="redToOrange"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button gradientDuoTone="orangeToRed" onClick={handleDeleteUser}>
                Delete Account
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>You have no users yet</p>
      )}
    </div>
  );
}

export default DashUsers;
