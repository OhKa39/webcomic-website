import React, { use } from 'react'
import {currentUser} from '@clerk/nextjs'
import prisma from './db'

const initialUser = async () => {
  const user = await currentUser()

  if(!user)
    return

  const profile = await prisma.user.findUnique({
    where:{
      userId: user.id
    }
  })

  if (profile)
    return

  const newProfile = await prisma.user.create({
      data:{
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress
      }
    })
  return
}

export default initialUser
