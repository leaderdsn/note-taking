import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts"

export default function PrivateRoute({ component: Component, to, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to={to} />
            }}
        ></Route>
    )
}