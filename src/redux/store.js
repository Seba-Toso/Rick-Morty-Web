import {createStore, combineReducers, compose, applyMiddleware} from 'redux'        //características que traigo de redux
import charsReducer, { setFilterAction } from './charsDuck'      //duck creado en charsDuck con el reducer que obtiene pj de la API  
import thunk from 'redux-thunk'                                                     //middleware para hacer promesas y peticiones al backend


let rootReducer = combineReducers({         //creo un reducer al que le daremos un valor de objeto y le pasaremos
    characters: charsReducer                //combineReducers para que junte todos los reducers de mi app
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Herramientas de desarrollador que traje desde github.com/zalmoxisus/redux-devtools-extension
                                                                                 //pregunta si el navegador soporta las herramientas de desarrollador


            //esta funcion crea un store y lo devuelve para usarlo en otro archivo
export default function generateStore(){
    let store = createStore(
        rootReducer, 
        composeEnhancers(applyMiddleware(thunk))
        )

    //llamo a la acción setFilter para inicialmente colocar el query a characters       
                                                            
    setFilterAction('Characters')(store.dispatch, store.getState)   //Al incio y creación del store, llamo a la función filtro para 
                                                                    //darle un valor inicial de Charactes (busqueda default)                                                             
    return store
}