import { createFeatureSelector, createSelector } from "@ngrx/store";

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

export function userReducer(state = initialState, action) {
    switch(action.type) {
        case 'MASK_USER_NAME':
            return { ...state, maskUserName: action.payload};
        default: return state;
    }
}