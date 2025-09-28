import React, { useEffect, useRef, useState } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { axiosClient } from "../../../utils/axios";
import { showToast } from "../../../utils/toast";
import { useUser } from "../../../contexts/UserContext";

const AvatarUploader = () => {
  const { user, setUser } = useUser();
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ||
      "http://getdrawings.com/free-icon-bw/free-avatars-icons-25.png"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview ngay lập tức
    setAvatarPreview(URL.createObjectURL(file));
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axiosClient.post("/api/user/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        showToast("Cập nhật ảnh đại diện thành công!", "success");
        setUser({ ...user, avatar: res.data.url }); // Cloudinary url
      }
    } catch (err) {
      console.error("Upload error:", err);
      showToast("Upload thất bại!", "error");
      setAvatarPreview(user?.avatar); // rollback nếu lỗi
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-20 w-20 rounded-full relative ">
        <img
          src={avatarPreview}
          alt="avatar"
          className={`w-full h-full object-cover rounded-full ${
            isLoading ? "opacity-50" : ""
          }`}
        />

        {/* Overlay loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <button
          disabled={isLoading}
          onClick={() => fileInputRef.current.click()}
          className={`h-[30px] w-[30px] flex items-center justify-center bg-neutral_1 border-2 border-white rounded-full absolute bottom-0 right-0 ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
        >
          <MdOutlinePhotoCamera size={18} className="text-white" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <h1 className="font-semibold text-xl leading-8 text-primary mt-[6px]">
        {user?.username}
      </h1>
    </div>
  );
};

export default AvatarUploader;
