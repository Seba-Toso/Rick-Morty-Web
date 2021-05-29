import {createStore, combineReducers, compose, applyMiddleware} from 'redux'        
import charsReducer, { setFilterAction } from './charsDuck'      
import thunk from 'redux-thunk'                                                    


let rootReducer = combineReducers({         
    characters: charsReducer                
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
                                                                                 
     
export default function generateStore(){
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
        )

           
    //after create store, put character as default filter                                                        
    setFilterAction('Characters')(store.dispatch, store.getState )   
                                                                                                                             
    return store
}