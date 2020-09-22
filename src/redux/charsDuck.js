import ApolloClient, {gql} from 'apollo-boost'   //importo ApolloClient y gql para utilizar en getCharactersAction version apollo
import {setQuery} from './queries'

// constantes 
let initialData = {             //creo una constante para el estado inicial
    fetching : false,           //esto es para saber si estan cargando los pj o si ya cargaron
    array: [],                  //esto contendrá la lista de pj completa
    current: '',                //esto contendrá la búsqueda actual
    filter: '',                 //esto contendrá el estado del filtro
    pages: null,                //esto contendrá el total de páginas
    nextPage: 1,                //esto contendrá el dato de la página siguiente a la que me encuentro (esto lo uso cuando uso graphql)
    prevPage: null,
    error: false
}

let client = new ApolloClient({
    uri : "https://rickandmortyapi.com/graphql"     //URL de la API del proyecto (cliente para apollo)
})

let filterQuery                 //esto contendrá el query correspondiente a cada filtro

let GET_CHARACTERS = "GET_CHARACTERS"                   //constante que representa la acción actual
let GET_CHARACTERS_SUCCES = "GET_CHARACTERS_SUCCES"     //constante que representa la acción exitosa
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"       //constante que representa la acción errónea (sea cual sea el error)

let SET_FILTER = "SET_FILTER"
let SET_CURRENT = "SET_CURRENT"

let UPDATE_PREV_PAGE = "UPDATE__PREV_PAGE"              //constante que representa la actualización de página
let UPDATE_NEXT_PAGE = "UPDATE_NEXT_PAGE"               //constante que representa la actualización de página
let UPDATE_PAGES = "UPDATE_PAGES"                       //constante que representa la actualización de página
let CLEAR_ARRAY = "CLEAR_ARRAY"
let CLEAR_CURRENT = "CLEAR_CURRENT"

// reducer          
export default function reducer(state=initialData, action){     //creo un switch y le coloco al estado, el valor de initialData
    switch(action.type){
        case UPDATE_NEXT_PAGE:
            return {...state, nextPage:action.payload}

        case UPDATE_PREV_PAGE:
            return {...state, prevPage:action.payload}
            
        case UPDATE_PAGES:
            return {...state, pages:action.payload}

        case SET_FILTER:
            return {...state, filter: action.payload}

        case SET_CURRENT:
            return {...state, current: action.payload}

        case GET_CHARACTERS:
            return {...state, fetching:true}

        case GET_CHARACTERS_ERROR:
            return {...state, fetching: false, error:action.payload}
            
        case GET_CHARACTERS_SUCCES:                                 //en caso de exito, devuelve lo que haya en state,
            return {...state, array:action.payload, fetching:false} //más lo que hay en array que será lo que devuelve action.payload

        case CLEAR_ARRAY:
            return {...state, array: action.payload}

        case CLEAR_CURRENT:
            return {...state, current: action.payload}

        default:
            return state
    }
}


// actions (action creators) o thunks
export let setFilterAction = (filterType) => (dispatch) => {
    dispatch({                           //si es exitoso, despacho la toma de pjs exitosa
        type: SET_FILTER,                //y mando el resultado de pjs
        payload: filterType
    })
    filterQuery = setQuery(filterType)
}

export let cleanAllAction = () => (dispatch, getState) => {
    dispatch({                                      //si es exitoso, despacho la toma de pjs exitosa
        type: CLEAR_ARRAY,                          //y mando el resultado de pjs
        payload: []
    })
    dispatch({                                      //si es exitoso, despacho la toma de pjs exitosa
        type: CLEAR_CURRENT,                        //y mando el resultado de pjs
        payload: ''
    })
    dispatch({                                      
        type: GET_CHARACTERS_ERROR,                 //actualizo la busqueda actual
        payload: false
    })
}

export let getCharactersAction = (input, page) => (dispatch, getState) => {     //esta parte es igual: creo la función y retorno el dispatch que trae los pjs                                                            
                                                                                //declaro el query que voy a pedirle a graphql
                                                                                //($page:Int) es la declaración de una variable en graphql
        let query = gql`${filterQuery}`
        

    //despacho GET_CHARACTERS
    dispatch({                  
        type: GET_CHARACTERS    
    })
    
    let {nextPage} = getState().characters                  //declaro una variable nextPage que contendrá la página siguiente a la que me encuentro
    
    return client.query({                                       //pido a mi cliente de graphql con query
        query,                                                  //le pido mi query definido antes
        variables: {                                            //declaro y le paso unas variables
            page: page? page : nextPage,                        //esta variable tendrá la página siguiente a la que me encuentro
            filter: {
                name: `${input? input : ''}`
            }
        }
    })
    .then(({data}) => {                              //obtengo una respuesta que está en data y el error
        dispatch({                                      
            type: SET_CURRENT,                              //actualizo la busqueda actual
            payload: input
        })
        dispatch({                                      
            type: GET_CHARACTERS_ERROR,                              //actualizo la busqueda actual
            payload: false
        })

        let dataPlace = Object.keys(data)[0];               //capturo el tipo de retorno del query
        if (dataPlace === 'characters'){
            dispatch({                                          
                type: GET_CHARACTERS_SUCCES,                    
                payload: data.characters.results
            })

            dispatch({                                          
                type: UPDATE_PAGES,                              
                payload: data.characters.info.pages ? data.characters.info.pages : 1
            })     
            dispatch({                                          
                type: UPDATE_NEXT_PAGE,                              
                payload: data.characters.info.next ? data.characters.info.next : 1
            })      
            dispatch({                                          
                type: UPDATE_PREV_PAGE,                              
                payload: data.characters.info.prev ? data.characters.info.prev : 0
            }) 
        }
        else if (dataPlace === 'episodes'){
            dispatch({                                          
                type: GET_CHARACTERS_SUCCES,                    
                payload: data.episodes.results 
            })

            dispatch({                                          
                type: UPDATE_PAGES,                              
                payload: data.episodes.info.pages ? data.episodes.info.pages : 1
            })     
            dispatch({                                          
                type: UPDATE_NEXT_PAGE,                              
                payload: data.episodes.info.next ? data.episodes.info.next : 1
            })      
            dispatch({                                          
                type: UPDATE_PREV_PAGE,                              
                payload: data.episodes.info.prev ? data.episodes.info.prev : 0
            }) 
        }
        else {
            dispatch({                                          
                type: GET_CHARACTERS_SUCCES,                    
                payload: data.locations.results 
            })

            dispatch({                                          
                type: UPDATE_PAGES,                              
                payload: data.locations.info.pages ? data.locations.info.pages : 1
            })     
            dispatch({                                          
                type: UPDATE_NEXT_PAGE,                              
                payload: data.locations.info.next ? data.locations.info.next : 1
            })      
            dispatch({                                          
                type: UPDATE_PREV_PAGE,                              
                payload: data.locations.info.prev ? data.locations.info.prev : 0
            }) 
        }
        

    })  
    .catch(({error})=>{
        console.log(error);            //si hay error, despacho la toma de pjs fallida
        dispatch({
            type: GET_CHARACTERS_ERROR,
            payload: true            
        })
        return
    })    
        
}