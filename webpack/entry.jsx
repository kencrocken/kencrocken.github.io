import React, { Component } from 'react';
import { render } from 'react-dom';
import NavBar from './components/NavBar';
import ContactForm from './components/ContactForm';

// class App extends Component {
//     render() {
//         return null;
//     }
// }

render( <NavBar /> , document.getElementById('navComponent'));
if( document.body.contains(document.getElementById('contactFormComponent') )){
    render( <ContactForm />, document.getElementById('contactFormComponent'));
}

