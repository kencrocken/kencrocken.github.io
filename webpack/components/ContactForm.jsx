import React, { Component } from 'react'
import axios from 'axios';

class ContactForm extends Component {

    constructor( props ) {
        super( props );
        this.state ={
            name: '',
            email: 'hello@',
            message: '',
            formErrors: { name: null, email: null, message: null },
            nameValid: false,
            emailValid: false,
            formValid: false,
            submitted: false,
            success: false,
            error: null
        }
        this.handleUserInput = this.handleUserInput.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    errorClass(error) {
        return( error ? 'has-error' : '' );
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        // let messageValid = this.state.passwordValid;

        switch (fieldName) {
            case 'name':
                nameValid = value !== '';
                fieldValidationErrors.name = nameValid ? null : ' is invalid';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? null : ' is invalid';
                break;
            // case 'message':
            //     messageValid = true;
            //     fieldValidationErrors.message = messageValid ? null : ' is invalid';
            //     break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid: nameValid,
            emailValid: emailValid,
            // messageValid: messageValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.nameValid && this.state.emailValid });
    }

    handleSubmit( event ) {

        event.preventDefault();

        const url = 'https://kencrocken.herokuapp.com/';
        const { name, email, message } = this.state;

        axios.post( url, { name, email, message })
            .then( result => {
                console.log( result );
                this.setState({
                    submitted: true,
                    success: true
                });
            })
            .catch( error => {
                console.log( error );
                this.setState({ error : error });
            });

    }

    render() {

        return (<div className="contact-form">
            { this.state.error && <div className="notification is-tomato-outline">
                <button class="delete" onClick={ () => { this.setState({ error: null }) } }></button>
                <strong>Sorry, there seems to have been an error.  Please try again.</strong>
            </div> }
            { !this.state.success && <form name="contactMe">
                <div className="field">
                    <div className={`control has-icons-left has-icons-right ${this.errorClass(this.state.formErrors.name)}`}>
                        <input onChange={ this.handleUserInput } type="text" className="input is-large has-icons-right" name="name" placeholder="Your name." value={this.state.name} required>
                        </input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-user-circle"></i>
                        </span>
                        { this.state.nameValid && <span className="icon is-small is-right has-text-success">
                            <i className="fas fa-check is-success"></i>
                        </span> }
                    </div>
                    { this.state.formErrors.name && <p className='help is-tomato'>
                        <span className="icon is-small">
                            <i className="fa fa-bug fa-lg fa-fw"></i>
                        </span>
                        Can I at least get your name?
                    </p>}
                </div>
                <div className="field">
                    <div className={`control has-icons-left has-icons-right ${this.errorClass(this.state.formErrors.email)}`}>
                        <input onChange={ this.handleUserInput } className="input is-large" type="email" name="email" placeholder="Your email." value={this.state.email} required></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        { this.state.emailValid && <span className="icon is-small is-right has-text-success">
                            <i className="fas fa-check is-success"></i>
                        </span> }
                    </div>
                    { this.state.formErrors.email && <p className="help is-tomato">
                        <span className="icon is-small">
                            <i className="fa fa-bug fa-lg fa-fw"></i>
                        </span>
                        How can I get in touch with you?
                    </p>}

                </div>
                <div className="field">
                    <div className="control has-icons-left has-icons-right">
                        <textarea onChange={ this.handleUserInput } className="textarea is-large" placeholder="What would you like to know?" name="message" value={this.state.message}></textarea>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-tomato" disabled={!this.state.formValid} onClick={this.handleSubmit}>SUbmit</button>
                    </div>
                </div>
            </form>}

            { this.state.success && <div className="help-block valid has-text-centered">
                <img src="http://fillmurray.com/g/300/300" alt="Murray"></img>
                <h3>You're Awesome!</h3>
                <h4>Get back to you soon.</h4>
            </div> }
        </div>

        );
    }
}

export default ContactForm;
