import React from 'react'
import Classes from './RecentSearch.module.css'

function RecentSearch(props) {
    return (
        <div>
            <div className='container'>
                <div className={Classes.RecentSearch}>
                    <h1>Recently Searched</h1>
                </div>
                <div className={Classes.Products}>
                    <div className='container'>
                        <div className='row'>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentSearch
