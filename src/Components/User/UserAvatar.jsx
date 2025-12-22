import { Avatar } from '@mui/material'
import React from 'react'

export default function UserAvatar({img,name}) {
  return (
    <>
    <Avatar alt={name?name:''} sx={{ width: 33, height: 33 }} src={img !== ''?img:''} />
    </>
  )
}
