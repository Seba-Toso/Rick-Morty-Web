import ApolloClient, {gql} from 'apollo-boost'  
//Query set by filter 
import {setQuery} from './queries'

// constantes 
let initialData = {             
    fetching : false,           
    array: [],                  //data recived from api
    current: '',                //current search write in the input field
    filter: '',                 //active filter
    pages: null,                //total pages
    nextPage: 1,                
    prevPage: null,
    error: false                
}

let client = new ApolloClient({
    uri : "https://rickandmortyapi.com/graphql"     
})

let filterQuery                                         //will contain query structure                     

let GET_INFORMATION = "GET_INFORMATION"                   
let GET_INFORMATION_SUCCES = "GET_INFORMATION_SUCCES"     

let GET_INFORMATION_ERROR = "GET_INFORMATION_ERROR"       

let SET_FILTER = "SET_FILTER"
let SET_CURRENT = "SET_CURRENT"

let UPDATE_PREV_PAGE = "UPDATE__PREV_PAGE"              
let UPDATE_NEXT_PAGE = "UPDATE_NEXT_PAGE"               
let UPDATE_PAGES = "UPDATE_PAGES"                       
let CLEAR_ARRAY = "CLEAR_ARRAY"
let CLEAR_CURRENT = "CLEAR_CURRENT"

         
export default function reducer(state=initialData, action){     
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


        case GET_INFORMATION:
            return {...state, fetching:true}
            
        case GET_INFORMATION_SUCCES:                                 
            return {...state, array:action.payload, fetching:false} 


        case GET_INFORMATION_ERROR:
            return {...state, fetching: false, error:action.payload}


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
    //get selected filter
    dispatch({                           
        type: SET_FILTER,                
        payload: filterType
    })
    //take the active filter and set the query
    filterQuery = setQuery(filterType)              
}

export let cleanAllAction = () => (dispatch) => {
    //clean info in array, current search and posible previous error
    dispatch({                                      
        type: CLEAR_ARRAY,                          
        payload: []
    })
    dispatch({                                      
        type: CLEAR_CURRENT,                        
        payload: ''
    })
    dispatch({                                      
        type: GET_INFORMATION_ERROR,                 
        payload: false
    })
}

export let getInformationAction = (input, page) => (dispatch) => {                                                                 

        let query = gql`${filterQuery}`

    dispatch({                  
        type: GET_INFORMATION    
    })
    
    //query to api using inputted page and search 
    return client.query({                                       
        query,                                                  
        variables: {                                            
            page: page,                                         
            filter: {
                name: `${input || ''}`
            }
        }
    })
    .then(({data}) => {                              
        dispatch({                                      
            type: SET_CURRENT,                              
            payload: input
        })
        //clean any previous error
        dispatch({                                      
            type: GET_INFORMATION_ERROR,                     
            payload: false
        })

        //pick object name inside data
        let dataPlace = Object.keys(data)[0];               
        if (dataPlace === 'characters'){
            dispatch({                                          
                type: GET_INFORMATION_SUCCES,                    
                payload: data.characters.results
            })
            dispatch({                                          
                type: UPDATE_PAGES,                              
                payload: data.characters.info.pages || 1
            })     
            dispatch({                                          
                type: UPDATE_NEXT_PAGE,                              
                payload: data.characters.info.next || 1
            })      
            dispatch({                                          
                type: UPDATE_PREV_PAGE,                              
                payload: data.characters.info.prev || 0
            }) 
            return
        }
        if (dataPlace === 'episodes'){
            dispatch({                                          
                type: GET_INFORMATION_SUCCES,                    
                payload: data.episodes.results 
            })
            dispatch({                                          
                type: UPDATE_PAGES,                              
                payload: data.episodes.info.pages || 1
            })     
            dispatch({                                          
                type: UPDATE_NEXT_PAGE,                              
                payload: data.episodes.info.next || 1
            })      
            dispatch({                                          
                type: UPDATE_PREV_PAGE,                              
                payload: data.episodes.info.prev || 0
            }) 
            return
        }
        else {
            dispatch({                                          
                type: GET_INFORMATION_SUCCES,                    
                payload: data.locations.results 
            })

            dispatch({                                          
                type: UPDATE_PAGES,                              
                payload: data.locations.info.pages || 1
            })     
            dispatch({                                          
                type: UPDATE_NEXT_PAGE,                              
                payload: data.locations.info.next || 1
            })      
            dispatch({                                          
                type: UPDATE_PREV_PAGE,                              
                payload: data.locations.info.prev || 0
            }) 
        }
    })  
    .catch(({error})=>{
        console.log(error);                                 
        dispatch({
            type: GET_INFORMATION_ERROR,
            payload: true            
        })
        return
    })    
        
}