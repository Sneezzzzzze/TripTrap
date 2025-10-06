"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

export default function DragDropImageBox({
  maxSizeMB = 5,
  onChange,
  accept = "image/*",
  className = "",
}) {
  const [image, setImage] = useState(null); // ใช้ object เดียวแทน array
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef(null);

  // cleanup object URL เมื่อ component ถูก unmount หรือเปลี่ยนรูป
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  const emitChange = useCallback(
    (fileObj) => {
      setImage(fileObj);
      if (onChange) onChange(fileObj ? [fileObj.file] : []);
    },
    [onChange]
  );

  const validateAndAddFile = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0]; // ✅ เอาไฟล์แรกเท่านั้น

    if (!file.type.startsWith("image/")) {
      alert("กรุณาเลือกรูปภาพเท่านั้น");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`ไฟล์มีขนาดเกิน ${maxSizeMB} MB`);
      return;
    }

    // clear รูปเก่า
    if (image) URL.revokeObjectURL(image.preview);

    const newImage = {
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}`,
    };

    emitChange(newImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    validateAndAddFile(e.dataTransfer.files);
  };

  const handleSelectClick = () => {
    inputRef.current?.click();
  };

  const handleFileInput = (e) => {
    validateAndAddFile(e.target.files);
    e.currentTarget.value = ""; // reset input
  };

  const removeImage = () => {
    if (image) URL.revokeObjectURL(image.preview);
    emitChange(null);
  };

  return (
    <div className={`${className}`}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleSelectClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSelectClick();
        }}
        className={`border-2 rounded-lg p-4 transition-colors cursor-pointer select-none flex flex-col items-center justify-center border-dashed min-h-48 m-5`}
        aria-label="Drag and drop image here or click to select"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={false} // ✅ ไม่ให้เลือกหลายรูป
          onChange={handleFileInput}
          className="hidden"
        />

        {!image ? (
          <div className="flex flex-col items-center text-gray-600">
            <h1 className="text-sm font-medium">เพิ่มรูปภาพกิจกรรม</h1>
          </div>
        ) : (
          <div className="relative w-full max-w-xs">
            <img
              src={image.preview}
              alt={image.file.name}
              className="w-full h-auto object-cover rounded-md border border-gray-300"
              draggable={false}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-2 right-2 bg-white/80 rounded-full p-[2px] px-2 shadow hover:bg-white"
              aria-label={`ลบ ${image.file.name}`}
              type="button"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
