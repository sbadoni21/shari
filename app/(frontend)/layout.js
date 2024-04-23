import TopNavBar from '@/components/frontend/TopNavBar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <TopNavBar/>
        {children}</div>
  )
}

export default layout