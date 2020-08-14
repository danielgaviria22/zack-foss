import React from 'react'
import { useInventory } from 'core/hooks/state'
import { getClassName } from 'core/utils/css-class';

const InventoryTab = () => {
    const inventory = useInventory();
    const root = getClassName({
        base: "inventory"
    })

    const itemClass = root.extend("&__item")

    return <div className={root}>
        {inventory
            .maybeGetAllItems()
            .map(data => {
                return data.map(({ id, amount },idx) => {
                    return <div key={idx} className={itemClass}>{id} x{amount}</div>
                })            
            })
            .onNone(() => <div className={itemClass}>-- Empty --</div>)
        }
    </div>
}

export default InventoryTab