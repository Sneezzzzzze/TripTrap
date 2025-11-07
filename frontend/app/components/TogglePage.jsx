"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TogglePage({ activity }) {
  const [active, setActive] = useState("left");
  const [members, setMembers] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newMemberId, setNewMemberId] = useState("");

  useEffect(() => {
    if (activity?.members?.length) {
      setMembers(activity.members);
    } else {
      const fetchMembers = async () => {
        try {
          const res = await axios.get(
            `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/${activity.activity_id}`
          );
          console.log("Members:", res.data);
          if (Array.isArray(res.data)) setMembers(res.data);
        } catch (err) {
          console.warn("ไม่สามารถโหลดข้อมูลสมาชิกได้:", err);
        }
      };
      if (activity?.activity_id) fetchMembers();
    }
  }, [activity]);

  // ✅ Helper: format date
  const formatDate = (dateString) => {
    if (!dateString) return "ไม่ระบุ";
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ✅ Delete member
  const handleDeleteMember = async () => {
    if (!memberToDelete) return;
    try {
      await axios.delete(
        `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/${activity.activity_id}/member/${memberToDelete}`
      );
      setMembers((prev) =>
        prev.filter((member) => member.user_id !== memberToDelete)
      );
      setShowConfirm(false);
      alert("ลบสมาชิกเรียบร้อยแล้ว");
    } catch (err) {
      console.error("Error deleting member:", err);
      alert("ไม่สามารถลบสมาชิกได้");
    }
  };

  // ✅ Add member
  const handleAddMember = async () => {
    if (!newMemberId.trim()) return alert("กรุณากรอก user_id ของสมาชิก");
    try {
      await axios.post(
        `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/${activity.activity_id}/member`,
        { user_id: newMemberId }
      );
      setMembers((prev) => [...prev, { user_id: newMemberId }]);
      setNewMemberId("");
      setShowAddPopup(false);
      alert("เพิ่มสมาชิกเรียบร้อยแล้ว");
    } catch (err) {
      console.error("Error adding member:", err);
      alert("ไม่สามารถเพิ่มสมาชิกได้");
    }
  };

  return (
    <div className="max-w-md mx-auto pb-30 relative">
      {/* ปุ่มเลือก */}
      <div className="flex gap-4 mb-2 p-4 justify-center">
        <button
          onClick={() => setActive("left")}
          className={`text-lg font-medium pb-1 ${
            active === "left"
              ? "border-b-2 border-[#106681] text-[#106681]"
              : "text-gray-500"
          }`}
        >
          รายละเอียดกิจกรรม
        </button>
        <button
          onClick={() => setActive("right")}
          className={`text-lg font-medium pb-1 ${
            active === "right"
              ? "border-b-2 border-[#106681] text-[#106681]"
              : "text-gray-500"
          }`}
        >
          สมาชิก
        </button>
      </div>

      {/* เนื้อหา */}
      <div className="px-5 rounded-xl mt-4">
        {active === "left" ? (
          <>
            {/* วันที่ */}
            <div className="flex justify-between mb-5">
              <div className="text-left space-y-3">
                <p>วันเริ่มกิจกรรม</p>
                <p>วันสิ้นสุดกิจกรรม</p>
              </div>
              <div className="text-right space-y-3">
                <p>{formatDate(activity.start_date)}</p>
                <p>{formatDate(activity.end_date)}</p>
              </div>
            </div>

            {/* สถานที่ */}
            <div className="space-y-3 mb-5">
              <p>สถานที่</p>
              <div className="flex items-center gap-2">
                <img src="/media/location.svg" alt="" />
                <p>{activity.location || "ไม่ระบุสถานที่"}</p>
              </div>
            </div>

            {/* งบประมาณ */}
            <div className="space-y-3 mb-5">
              <p>ค่าใช้จ่ายรวม</p>
              <div className="flex gap-2">
                <p>{activity.budget ? `${activity.budget} บาท` : "ไม่ระบุ"}</p>
              </div>
            </div>

            {/* รายละเอียดกิจกรรม */}
            <div className="space-y-3">
              <p>รายละเอียดกิจกรรม</p>
              <textarea
                className="p-4 border rounded-2xl w-full h-24 resize-none"
                readOnly
                value={activity.description || "ไม่มีรายละเอียดกิจกรรม"}
              ></textarea>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-5 place-items-center gap-3">
            {/* ✅ Members list */}
            {members.length > 0 ? (
              members.map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="relative flex flex-col items-center w-fit"
                  onMouseEnter={() => setHoveredId(member.user_id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <img
                    src={member.img || "/profilepic/profile.jpg"}
                    alt={member.name || "สมาชิก"}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#106681]/20"
                  />
                  <span className="text-gray-800 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                    {member.user_id || "ไม่ทราบชื่อ"}
                  </span>

                  {/* ❌ Delete overlay */}
                  {hoveredId === member.user_id && (
                    <button
                      onClick={() => {
                        setMemberToDelete(member.user_id);
                        setShowConfirm(true);
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full"
                    >
                      <span className="text-white text-xl font-bold">×</span>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="col-span-5 text-gray-400 mt-4">
                ยังไม่มีสมาชิกเข้าร่วม
              </p>
            )}

            {/* ➕ Add Member */}
            <button
              onClick={() => setShowAddPopup(true)}
              className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 w-12 h-12 rounded-full text-2xl font-bold text-[#106681]"
              title="เพิ่มสมาชิก"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* ❗ Confirm Delete Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <p className="text-center mb-4">
              ต้องการลบสมาชิกนี้ออกจากกิจกรรมหรือไม่?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteMember}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                ลบ
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ➕ Add Member Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h2 className="text-center font-semibold mb-3">เพิ่มสมาชิกใหม่</h2>
            <input
              type="text"
              placeholder="กรอก user_id"
              value={newMemberId}
              onChange={(e) => setNewMemberId(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAddMember}
                className="bg-[#106681] text-white px-4 py-2 rounded-xl hover:bg-[#0d566e] transition"
              >
                เพิ่ม
              </button>
              <button
                onClick={() => setShowAddPopup(false)}
                className="bg-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
