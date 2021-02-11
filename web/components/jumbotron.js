import React from "react";

export default function Jumbotron({children}) {
    const style = {
        padding: "2rem 1rem",
        marginBottom: "2rem",
        backgroundColor: "light grey",
        borderRadius: ".3rem"
    }
  return (
      <div style={style}>
          {children}
      </div>
  )
}
