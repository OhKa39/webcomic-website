// "use client"
// import React, { useState } from 'react';
// import {useUser} from"./_components/userContext"
// interface Comic {
//   id: string;
//   title: string;
// }

// const ComicButton: React.FC<{ comic: Comic }> = ({ comic }) => {
//   const [isFollowing, setIsFollowing] = useState<boolean>(false);
//   const { user } = useUser();

//   const handleFollowClick = () => {
//     if (!user) {
//       alert('Bạn cần đăng nhập để thực hiện chức năng này');
//       return;
//     }

//     // Logic để thêm hoặc xoá comicId khỏi mảng isFollowing
//     if (isFollowing) {
//       // Xoá comicId khỏi mảng isFollowing
//       setIsFollowing(false);
//     } else {
//       // Thêm comicId vào mảng isFollowing
//       setIsFollowing(true);
//     }
//   };

//   return (
//     <button onClick={handleFollowClick}>
//       {isFollowing ? 'Hủy theo dõi' : 'Theo dõi'} {comic.title}
//     </button>
//   );
// };

// export default ComicButton;
