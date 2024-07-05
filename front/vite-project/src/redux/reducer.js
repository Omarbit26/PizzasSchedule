import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userActive: {},
    userAppointments: []
}

export const userSlice = createSlice({
    name: "userData",
    initialState: initialState,
    reducers:{
        setUserActive: (state,action)=>{
            state.userActive = action.payload
        },
        setUserAppointment: (state,action)=>{
            state.userAppointments = action.payload
        }
        ,
        clearUser: (state,action)=>{
            state.userActive = initialState.userActive
        },
        cancelAppointmentAction: (state,action)=>{
            state.userAppointments = state.userAppointments.map((appointment)=>{
                if(appointment.id == action.payload){
                    return{...appointment, status:"cancelled"}
                }
                return appointment;
            })
        },
        createAppointmentAction: (state,action)=>{
            state.userAppointments = state.userAppointments.push(action.payload)
        }
    }
})


export const {setUserActive,setUserAppointment,clearUser,cancelAppointmentAction,createAppointmentAction} = userSlice.actions;