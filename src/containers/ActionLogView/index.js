import React from "react"
import { prop } from "ramda"
import ActionLog from "components/ActionLog"
import { useLog } from "core/hooks/state"
import { getClassName } from "core/utils/css-class"
import "./style.scss"

const ActionLogView = () => {
    const lines = useLog(prop("message"));

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