import React from 'react'
import Classes from './ShopOnBudget.module.css'

function ShopOnBudget(props) {
    return (
        <div>
            <div className={Classes.ShopOnBudgetText}>
                <div className={Classes.ShopOnBudgetMainText}>
                    <h1>Shop on Budget</h1>
                </div>
                <p className={Classes.ShopOnBudgetSubText}>
                    We have every style at your affordable budget
                </p>
            </div>
            <div className={Classes.ShopOnBudgetImages}>
                <div className='container'>
                    <div className='row'>
                        {props.children}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ShopOnBudget
