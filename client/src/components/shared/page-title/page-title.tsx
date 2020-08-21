import React from 'react'
type textType = {
    text: "string"
}

const PageTitle = ({ text }: textType) => {
    return (
        <div className='page-title'>
            <p className="page-title__text">
                {text}
            </p>
        </div>
    )
}

export default PageTitle
