"use client"

export default function Error() 
{
    function handleOnClick(){
        window.location.href = '/'
    }
  return (
    <div className="h-screen text-center p-5">
      <h2 className="text-5xl text-yellow-600">Đang tải! Vui lòng chờ</h2>
    </div>
  )
}