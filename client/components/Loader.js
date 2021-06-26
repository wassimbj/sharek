import { Spinner } from 'gestalt'
import React from 'react'

export default function Loader() {
   return (
      <div className="p-2 my-20">
         <Spinner show accessibilityLabel="Loading..." />
      </div>
   )
}
