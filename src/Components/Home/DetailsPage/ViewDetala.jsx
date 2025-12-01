import React, { useRef, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useAuth } from "../../../Contexts/AuthContext";

const ViewDetala = () => {
  const crop = useLoaderData();
  const { user } = useAuth();
  const viewModalRef = useRef(null);

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("Interested in 1kg");
  const [alreadySent, setAlreadySent] = useState(false);
  const [receivedInterests, setReceivedInterests] = useState([]);

  const isOwner = crop?.owner?.ownerEmail === user?.email;
  const totalPrice = quantity * crop?.pricePerUnit;

  // Check if user already sent interest
  useEffect(() => {
    if (crop?.interests && user?.email) {
      setAlreadySent(crop.interests.some((i) => i.userEmail === user.email));
    }

    // For owner: load interests
    if (isOwner) {
      setReceivedInterests(crop?.interests || []);
    }
  }, [crop, user, isOwner]);

  const handelViewModal = () => {
    viewModalRef.current.showModal();
  };

  const handelDetalasSumbit = async (e) => {
    e.preventDefault();
    if (quantity < 1) return alert("Quantity must be at least 1");

    const interestData = {
      cropId: crop?._id,
      userEmail: user?.email,
      userName: user?.displayName,
      quantity,
      message,
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:5000/interest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(interestData),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Interest submitted successfully!");
        setAlreadySent(true);
        viewModalRef.current.close();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit interest");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/interest/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Status updated");
        setReceivedInterests((prev) =>
          prev.map((i) => (i._id === id ? { ...i, status } : i))
        );
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  if (!crop) return <div>Loading...</div>;

  const { image, name, price, unit, description, location } = crop;

  return (
    <div className="bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl w-full">
        {/* Crop Image */}
        <div className="w-full h-72 overflow-hidden rounded-xl mb-6">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Crop Info */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{name}</h1>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-semibold text-green-600">৳ {price}</span>
          <span className="text-gray-600 text-lg">/ {unit}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-5">
          <MapPin size={20} className="text-red-500 mr-2" />
          <span className="text-lg">{location}</span>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
          <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
        </div>

        {/* Non-owner: Interest Button */}
        {!isOwner && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handelViewModal}
              disabled={alreadySent}
              className={`${
                alreadySent
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              } text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-300`}
            >
              {alreadySent ? "Interest Already Sent" : "I'm Interested"}
            </button>
          </div>
        )}

        {/* Interest Modal */}
        <dialog ref={viewModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <form
              onSubmit={handelDetalasSumbit}
              className="bg-white shadow-md rounded-2xl p-6 space-y-4 w-full max-w-md mx-auto"
            >
              <h2 className="text-2xl font-bold text-emerald-500 text-center">Show Your Interest</h2>

              <div>
                <label className="block text-sm font-medium mb-1">Your Email</label>
                <input
                  type="email"
                  readOnly
                  value={user?.email}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  readOnly
                  value={user?.displayName}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quantity ({unit})</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value));
                    setMessage(`Interested in ${e.target.value}${unit}`);
                  }}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <p>Total Price: ৳ {totalPrice}</p>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-xl hover:bg-emerald-600 transition"
              >
                Submit Interest
              </button>
            </form>

            <div className="modal-action">
              <button className="btn" onClick={() => viewModalRef.current.close()}>
                Close
              </button>
            </div>
          </div>
        </dialog>

        {/* Owner: Received Interests */}
        {isOwner && (
          <div className="mt-8 border p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Received Interests</h2>
            {receivedInterests.length === 0 ? (
              <p>No interests yet.</p>
            ) : (
              <table className="w-full table-auto border">
                <thead>
                  <tr className="border bg-gray-100">
                    <th className="border p-2">Buyer Name</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Message</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {receivedInterests.map((i) => (
                    <tr key={i._id}>
                      <td className="border p-2">{i.userName}</td>
                      <td className="border p-2">{i.quantity}</td>
                      <td className="border p-2">{i.message}</td>
                      <td className="border p-2">{i.status}</td>
                      <td className="border p-2 space-x-2">
                        {i.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(i._id, "accepted")}
                              className="px-2 py-1 bg-green-500 text-white rounded"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(i._id, "rejected")}
                              className="px-2 py-1 bg-red-500 text-white rounded"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetala;
