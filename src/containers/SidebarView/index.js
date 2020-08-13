import React, { useState } from "react"
import { getClassName } from "core/utils/css-class"
import { head } from 'ramda'
import "./index.scss"

const Tab = ({ text, selected, onClick }) => {
    const root = getClassName({
        base: "sidebar__tabs__tab",
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

    const handleSelect = (idx,name) => () => onSelect([idx,name])

    return <div className={root}>
        {options.map( (opt, idx) => {
            return <Tab 
                key={idx} 
                text={opt} 
                selected={selected === idx}
                onClick={handleSelect(idx,opt)}
            />
        })}
    </div>
}

const SidebarView = () => {
    const options = [
        "Actions",
        "Storage"
    ]
    const [ tab , setTab ] = useState([0,head(options)]);
    const root = getClassName({
        base: "sidebar"
    })
    return <aside className={root}>
        <Tabs 
            selected={head(tab)} 
            onSelect={setTab}
            options={options}
        />
    </aside>
}

export default SidebarView