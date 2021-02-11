import React from "react";

export default function Blockquote({children,citation}) {
    const style = {
        borderLeft:"5px solid grey",
        padding:5
    }
    const citationstyle = {
        fontStyle:"italic"
    }
    return (
        <div>
            <div style={style}>
                {children}
            </div>
            <div style={citationstyle} >
                - {citation? citation : "Anonymous"}
            </div>
        </div>
    )
}
