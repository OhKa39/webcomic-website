import React from 'react'
import ContainerItems from './Container-items'

import file1 from 'D:/TruongDH/KTPM/1.json'
import file2 from 'D:/TruongDH/KTPM/2.json'
import file3 from 'D:/TruongDH/KTPM/3.json'


//const data =  JSON.stringify(files)
//console.log(typeof(data))

const data : object[] = []
data.push(file1)
data.push(file2) 
data.push(file3) 


export default function Container() {    
  return (     
    <div>
        <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5 ">
            <ContainerItems data={data}/>
        </div>
    </div>
  )
}
