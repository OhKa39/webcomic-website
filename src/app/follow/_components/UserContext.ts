// // UserContext.tsx

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { currentUser } from '@clerk/nextjs';
// import prisma from '@/lib/db';

// interface User {
//   id: string;
 
// }

// export interface UserContextType {
//   user: User | null;
//   isLoading: boolean;
// }

// export const UserContext = createContext<UserContextType>({ user: null, isLoading: true });

// export const useUser = () => useContext(UserContext);

// interface UserProviderProps {
//   children: ReactNode;
// }

// export const UserProvider = ({ children }: UserProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const user = await currentUser();
//         if (!user) {
//           setIsLoading(false);
//           return;
//         }

//         const profile = await prisma.user.findUnique({
//           where: { userId: user.id }
//         });

//         if (profile) {
//           setUser(profile);
//         } else {
//           const newProfile = await prisma.user.create({
//             data: {
//               userId: user.id,
//               name: `${user.firstName} ${user.lastName}`,
//               imageUrl: user.imageUrl,
//               email: user.emailAddresses[0].emailAddress
//             }
//           });
//           setUser(newProfile);
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, isLoading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
