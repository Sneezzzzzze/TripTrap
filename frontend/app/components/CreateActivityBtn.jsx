'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react'; // optional modern icon

export default function CreateActivityBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/activities/create')}
      className="
        fixed bottom-25 right-5 z-50 
        flex items-center justify-center 
        w-14 h-14 sm:w-16 sm:h-16
        rounded-full 
        bg-gradient-to-br bg-[#106681]
        shadow-lg shadow-indigo-300/50
        hover:scale-110 active:scale-95
        transition-all duration-300 ease-out
        text-white font-bold text-3xl
      "
    >
      {/* You can replace with a + if you prefer text */}
      <Plus className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={3} />
    </button>
  );
}
