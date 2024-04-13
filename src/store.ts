import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	// no reducer is required for this project
})

const store = configureStore({
	reducer: rootReducer,
	middleware: (middlewares) => middlewares().concat(
		
	)
})

export type RootState = ReturnType<typeof store.getState>

export default store
