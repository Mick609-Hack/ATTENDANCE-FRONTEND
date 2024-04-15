import React from "react"

export const AuthReducer = (state = {
    user: null
}, action) =>{
    switch(action.type){
        case "LOGIN":
            return{user: action.payload}
        case "LOGOUT":
            return{user: null}
        default: {
            throw Error("Unknown Action: " + action.type)
        }
    }
}