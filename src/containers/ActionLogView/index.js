import React from "react"
import ActionLog from "components/ActionLog"
import { useLog } from "core/hooks/state"
import { useDispatch } from "react-redux"
import { addLine, resetLog } from "redux/actionLog"
import { compose } from "ramda"
import { getClassName } from "core/utils/css-class"
import "./style.scss"

const ActionLogView = () => {
    const lines = useLog()
    const dispatch = useDispatch()
    
    window["addLine"] = compose( dispatch, addLine)
    window["resetLog"] = compose( dispatch, resetLog )

    const root = getClassName({
        base: "action-log-view",
    })

    const contentClass = root.extend("&__content");

    return <div className={root}>
        <div className={contentClass}>
            <ActionLog 
                fluid
                lines={lines}
            />
        </div>
    </div>
}

export default ActionLogView