'use client'

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 px-6 mb-6 border border-gray-100 transition hover:shadow-lg hover:-translate-y-0.5 duration-200">
      <table className="w-full border-separate border-spacing-y-2">
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="font-medium text-gray-700 py-2">ชื่อ - นามสกุล</td>
            <td className="text-right text-gray-900 font-semibold">คณิศร สมศรีอักษรแสง</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="font-medium text-gray-700 py-2">Username</td>
            <td className="text-right text-gray-900 font-semibold">Bess Kanisorn</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="font-medium text-gray-700 py-2">อีเมล</td>
            <td className="text-right text-gray-900 font-semibold">bess@gmail.com</td>
          </tr>
          <tr>
            <td className="font-medium text-gray-700 py-2">Password</td>
            <td className="text-right text-gray-500 tracking-wider">••••••</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
