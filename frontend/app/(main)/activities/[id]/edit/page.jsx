"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditActivityPage() {
  const router = useRouter();
  const { id } = useParams();
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    budget: "",
    start_date: "",
    end_date: "",
    image: "",
  });
  const [previewUrl, setPreviewUrl] = useState("/media/PleaseStop.jpg");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch existing activity data
  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/${id}`
        );
        const data = Array.isArray(res.data) ? res.data[0] : res.data;

        setForm({
          name: data.name || "",
          description: data.description || "",
          location: data.location || "",
          budget: data.budget || "",
          start_date: data.start_date?.split("T")[0] || "",
          end_date: data.end_date?.split("T")[0] || "",
          image: data.image || "",
        });

        if (data.image) {
          try {
            const imgRes = await axios.get(`/api/upload-url`, {
              params: { key: data.image },
            });
            if (imgRes.status === 200) setPreviewUrl(imgRes.data.url);
          } catch {
            console.warn("Failed to load image URL");
          }
        }
      } catch (err) {
        console.error("Error loading activity:", err);
        setError("ไม่สามารถโหลดข้อมูลกิจกรรมได้");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle image change
        const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(selectedFile);
        };


    // ✅ Submit form (PUT request)
    const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
        let imageKey = form.image;

        // ✅ Upload image if a new one is selected
        if (file) {
        const uploadRes = await axios.post("/api/upload-url", {
            fileName: file.name,
            fileType: file.type,
        });

        const { url, key } = uploadRes.data;
        await axios.put(url, file, {
            headers: { "Content-Type": file.type },
        });

        imageKey = key;
        }

        // ✅ Prepare updated data
        const updatedData = {
        ...form,
        image: imageKey,
        };

        // ✅ Send PUT request to your backend
        await axios.put(
        `https://1ww13nlkz3.execute-api.us-east-1.amazonaws.com/dev/activity/${id}`,
        updatedData
        );

        alert("อัปเดตกิจกรรมสำเร็จ!");
        router.back(); // ✅ Return to previous page

    } catch (err) {
        console.error("Error updating activity:", err);
        alert("เกิดข้อผิดพลาดในการอัปเดตกิจกรรม");
    } finally {
        setSaving(false);
    }
    };


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 animate-pulse">กำลังโหลด...</p>
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-6 mb-20">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">แก้ไขกิจกรรม</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-black transition"
          >
            ย้อนกลับ
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image preview */}
          <div className="flex flex-col items-center space-y-3">
            <img
              src={previewUrl}
              alt="activity"
              className="w-48 h-48 object-cover rounded-xl shadow"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">ชื่อกิจกรรม</label>
            <input
              type="text"
              name="title"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">วันเริ่มกิจกรรม</label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">วันสิ้นสุดกิจกรรม</label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">สถานที่</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">งบประมาณรวม (บาท)</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">รายละเอียดกิจกรรม</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-2"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#106681] hover:bg-[#0d566e] text-white py-2 rounded-xl transition"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </button>
        </form>
      </div>
    </div>
  );
}
