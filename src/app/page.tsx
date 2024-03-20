import Container from "@/components/Container";
import { PiBookOpenFill } from "react-icons/pi";
import {PrismaClient} from '@prisma/client'
import { auth } from '@clerk/nextjs'
export default async function Home() {
  const { userId } : { userId: string | null } = auth();
  return (
    <div className='p-3 pt-4 text-center'>
      <PiBookOpenFill className="inline"/>
      <h1 className='uppercase font-bold'>New Comics</h1>
      <Container/>
    </div>
    
  );
}
