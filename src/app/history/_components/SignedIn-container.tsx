import Container from "@/components/Container";

const getData = async (profile: any) => {
    const urlPage = process.env.NEXT_PUBLIC_URL;
    const data = await fetch(`${urlPage}/api/SignedinHistory?userId=${profile.id}`);
    return data.json();
};

export default async function SignedInContainer({profile} : {profile: any}) {
    
    const data = await getData(profile);
    

    if (data.length == 0) return(<h1>không tìm thấy truyện!</h1>);
    data.forEach((i: any) => {
        i.id = i.Comics.id;
        i.comicName = i.Comics.comicName;
        i.comicImageLink = i.Comics.comicImageLink;
        delete i["Comics"];
    });
    return (
    <div>
        <Container data={data}/>
    </div>
  )
}
