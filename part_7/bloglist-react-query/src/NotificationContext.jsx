import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      const { message, variant } = action.payload;
      return { ...state, message, variant };
    }
    case 'CLEAR': {
      return { message: '', variant: '' };
    }
    default:
      return state;
  }
};

const NotificationContext = createContext();

//optional - we can define additinoal funcs below in the NotificationContextProvider
//and export them as needed passing in the value field...this way we can have clear the timeout bug etc....

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: '',
    variant: '',
  });

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
