const { createContext, useReducer } = require("react");

export const TodosContext = createContext();

//Reducer
export const todosReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TODOS':
            return {
                todos: action.payload
            };
        case 'ADD_TODO':
            return {
                todos: [action.payload, ...state.todos]
            };
        case 'UPDATE_TODO':
            return {
                todos: state.todos.map((todo) => 
                    todo._id === action.payload._id ? action.payload : todo
                )
            };
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter((each) => 
                    each._id !== action.payload._id
                )
            };
        default:
            return state
    }
};

export const TodosContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(todosReducer, {
        todos: []
    })

    return(
        <TodosContext.Provider value={{...state, dispatch}}>
            {children}
        </TodosContext.Provider>
    )
}