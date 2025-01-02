import React from 'react'
import logoM from '../assets/samachar.png'
import logoS from '../assets/samachar.png'
import logoB from '../assets/blogappBlack.svg'


function Logo({ width = '100px', color }) {

  let logoColor = color ? logoS : logoM

  return (
    <>
      <img width={width} src={logoColor} alt="Logo" />
    </>
  )
}
export default Logo