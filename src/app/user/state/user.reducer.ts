import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserActions, UserActionTypes } from "./user.actions";

export interface UserState {
    maskUserName: boolean;
    currentUser: string;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: ''
}

const getUserFeatureState = createFeatureSelector<UserState>('users');
export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
)
export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
)

export function userReducer(state = initialState, action: UserActions) {
    switch(action.type) {
        case UserActionTypes.MaskUserName:
            return { ...state, maskUserName: action.payload};
        default: return state;
    }
}