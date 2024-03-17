import Container from "@/components/Container";
import { PiBookOpenFill } from "react-icons/pi";

export default function Home() {
  return (
    <div className='p-3 pt-4 text-center '>
      <PiBookOpenFill className="inline"/>
      <h1 className='uppercase font-bold'>New Comics</h1>
      <Container/>
    </div>
    
  );
}
