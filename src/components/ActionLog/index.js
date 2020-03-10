import React, { useRef, useEffect } from 'react'
import { getClassName } from 'core/utils/css-class'
import { Maybe } from 'core/structures'
import "./style.css"

const ActionItem = ({ data, children }) => {
    return <article className="action-log__line">
        {data || children}
    </article> 
}

const scrollToBottom = (ref) => {
    Maybe.fromFalsy(ref.current)
        .effect(curr => curr.scrollTo(0, curr.scrollHeight))
}

const ActionLog = (props) => {
    const { lines, children, fluid, disableScroll } = props
    const scrollRef = useRef(null);

    useEffect(() => {
        if( !disableScroll ){
            scrollToBottom(scrollRef);
        }
    },[disableScroll,lines])

    const baseClass = getClassName({
        "action-log": true,
        "action-log--fluid": fluid
    })

    return <div ref={scrollRef} className={baseClass}>
        <section className="action-log__container">
            { lines.length ? lines.map((x,i) => <ActionItem data={x} key={i}/>) : children }
        </section>
    </div>
}

ActionLog.Item = ActionItem;

export default ActionLog