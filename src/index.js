import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'               //traigo el provider desde react-redux para poder pasar el store
import generateStore from './redux/store'          //traigo las funciones generateStore desde store.js
import  ApolloClient  from 'apollo-boost'          //traigo el cliente desde apollo-boost. OJO-> sin llaves
import { ApolloProvider } from 'react-apollo'      //traigo el provider de apollo desde reac-apollo para poder pasar el client

let store = generateStore()                        //capturo el store generado desde generateStore

let client = new ApolloClient({                     //creo un cliente que será una nueva instacia de apolloClient y le paso la uri
    uri: "https://rickandmortyapi.com/graphql"      //del graphQL de la API de RickandMorty
})
let WithRouter = () => <BrowserRouter><App /></BrowserRouter>
let WithStore  = () => <Provider store={store}><WithRouter /></Provider>                  //al provider de redux le paso como props el store
let WithApollo = () =>  <ApolloProvider client={client}><WithStore/></ApolloProvider>    //al provider de apollo le paso como props el store

ReactDOM.render(<WithApollo />, document.getElementById('root'));    //renderizo desde withStore que adentro tiene WithRouter

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
