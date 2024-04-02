"use client"

export default function Error({error}: {error: Error}) 
{
    function handleOnClick(){
        window.location.href = '/'
    }
  return (
    <div className="h-screen text-center p-5">
      <h1>{error.message}</h1>
      <h2 className="text-8xl pb-10 text-red-600">Đã có lỗi xảy ra!</h2>
      <button className="text-lg bg-amber-400 p-5 hover:underline hover:underline-offset-8" onClick={handleOnClick}>Quay về trang chủ</button>
    </div>
  )
}