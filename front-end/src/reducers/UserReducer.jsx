export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS'
export const USER_PROFILE_FAIL = 'USER_PROFILE_FAIL'
export const USER_PROFILE_RESET = 'USER_PROFILE_RESET'
export const USER_PROFILE_UPDATE = 'USER_PROFILE_UPDATE'

const INITIAL_STATE = { success: false, firstName: '', lastName: '' }

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      const { firstName, lastName } = action.payload.body;
      return { ...state, success: true, firstName, lastName };
    case USER_PROFILE_UPDATE:
      const { firstName: updatedFirstName, lastName: updatedLastName } = action.payload.body;
      return { ...state, success: true, firstName: updatedFirstName, lastName: updatedLastName };
    case USER_PROFILE_FAIL:
      return { ...state, error: action.payload };
    case USER_PROFILE_RESET:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
