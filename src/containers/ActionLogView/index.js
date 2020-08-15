import React from "react"
import ActionLog from "components/ActionLog"
import { useLog } from "core/hooks/state"
import { useDispatch } from "react-redux"
import { addLine, resetLog, addTemporalLine, addFixedLine } from "redux/actionLog"
import { compose, prop } from "ramda"
import { getClassName } from "core/utils/css-class"
import "./style.scss"
import { startTimer, stopTimer } from "redux/timer"

const ActionLogView = () => {
    const lines = useLog(prop("message"));
    const dispatch = useDispatch()
    
    window["addLine"] = compose( dispatch, addLine )
    window["addFixedLine"] = compose( dispatch, addFixedLine )
    window["addTemporalLine"] = compose( dispatch, addTemporalLine )
    window["resetLog"] = compose( dispatch, resetLog )
    window["startTimer"] = compose( dispatch, startTimer );
    window["stopTimer"] = compose( dispatch, stopTimer );

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