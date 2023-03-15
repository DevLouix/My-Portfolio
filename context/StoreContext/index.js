import React, { createContext, useState } from 'react'
const ShowDetail = createContext()

function StoreContext({children}) {
    const [DB_Details,setDB_Details] = useState([])
    const [showDetail,setShowDetail] = useState(false)

    return (
        <ShowDetail.Provider value={{showDetail,setShowDetail,DB_Details,setDB_Details}}>
            {children}
        </ShowDetail.Provider>
    )
}

export{
    StoreContext,
    ShowDetail
}