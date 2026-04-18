const { createContext, useReducer } = require("react");

// createContext gives me a "global container" that any component can access without having to pass props down through every level 
export const TodosContext = createContext();

// the reducer is a function which decides how the state changes 
// it takes the current state and an action, and always returns a NEW state 
// (never change the old state directly - this is called immutability)
export const todosReducer = (state, action) => {
    switch(action.type) {

        // SET_TODOS: replace the whole list - and I use this when first loading todos from the backend API
        case 'SET_TODOS':
            return {
                todos: action.payload
            };

        // ADD_TODO: put the new todo at the start of the array
        // spreding ...state.todos keeps the existing ones and add the new one on the top
        case 'ADD_TODO':
            return {
                todos: [action.payload, ...state.todos]
            };

        // UPDATE_TODO: go through every todo and swap the one that changed
        // I compare _id because that's the unique MongoDB id 
        case 'UPDATE_TODO':
            return {
                todos: state.todos.map((todo) => 
                    todo._id === action.payload._id ? action.payload : todo
                )
            };

        // DELETE_TODO: keep all todo exccept the one we deleted
        // filter returns a new array, so the original state is not muated
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter((each) => 
                    each._id !== action.payload._id
                )
            };

        // if an unknown action type is dispatched, just return state unchanged  
        // that avoids crashing the app from a typo in action type  
        default:
            return state
    }
};

// this is the Provider component that wraps the whole app (in index.js)
// it makes the todos array and dispatch function available to every child components
export const TodosContextProvider = ({ children }) => {

    // useReducer takes the Reducer funtion and the initial state
    // dispatch is the funtion I call to trigger state changes
    const [state, dispatch] = useReducer(todosReducer, {
        todos: [] // start with empty array before fatching from API
    })

    return(
        <TodosContext.Provider value={{...state, dispatch}}>
            {children}
        </TodosContext.Provider>
    )
}