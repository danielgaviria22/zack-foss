import React, { useState } from "react"
import { getClassName } from "core/utils/css-class"
import { head } from 'ramda'
import "./index.scss"
import Inventory from "containers/Inventory"

const Tab = ({ text, selected, baseClass, onClick }) => {
    const root = baseClass.extend("&__tab").recompute({
        "&--selected": selected,
    })
    return <span className={root} onClick={onClick}>
        {text}
    </span>
}

const Tabs = (props) => {
    const { selected, options, onSelect } = props

    const root = getClassName({
        base: "sidebar__tabs"
    })

    const handleSelect = (index,name) => () => onSelect({ index, name })

    return <div className={root}>
        {options.map( (opt, idx) => {
            return <Tab 
                key={idx} 
                text={opt} 
                selected={selected === idx}
                baseClass={root}
                onClick={handleSelect(idx,opt)}
            />
        })}
    </div>
}

const Content = ({ tab, baseClass }) => {
    const root = baseClass.extend("&__content")
    return <section className={root}>
        {
            {
                Action: <div></div>,
                Inventory: <Inventory />
            }[tab]
        }
    </section>
}

const SidebarView = () => {
    const options = [
        "Actions",
        "Inventory"
    ]
    const [ tab , setTab ] = useState({ index:0 , name:head(options) });
    const root = getClassName({
        base: "sidebar"
    })
    return <aside className={root}>
        <Tabs 
            selected={tab.index} 
            onSelect={setTab}
            options={options}
        />
        <Content 
            tab={tab.name}
            baseClass={root}
        />
    </aside>
}

export default SidebarView