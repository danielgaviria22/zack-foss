import React, { useEffect, useState } from 'react'
import Session from 'core/middleware/session'
import Spinner from 'components/Spinner'
import "./style.scss"

const Placeholder = () => {
    return <div className="blocker">
        <button 
            className="blocker__button"
            onClick={() => Session().becomeMain() }
        >Switch to this tab</button>
    </div>
}

const SessionMonitor = ({ main, children }) => {
    const [ loading, setLoading] = useState(true)
    useEffect(() => {
        let id = window.setTimeout(() => setLoading(false),1000);
        return () => window.clearTimeout(id)
    },[])

    if( loading ){
        return <Spinner />
    }
    return main ? children: <Placeholder />
}

export default SessionMonitor;