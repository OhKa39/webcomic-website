import React from 'react'
import ContainerItems from './Container-items'

async function getData() {
    const res = await fetch('http://localhost:3000/api/comic?page=1')
   
    return res.json()
  }

export default async function Container() {
    const data = await getData()
    return (
        <div className="grid grid-cols-5 mx-auto max-w-6xl py-4 w-full gap-5">
            <ContainerItems data={data} />
        </div>
    )
}



