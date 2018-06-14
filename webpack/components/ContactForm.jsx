import React, { Component } from 'react'
import axios from 'axios';
import { WithJekyll } from './JekyllHOC';

class HoneyPot extends Component {

    constructor( props ) {
        super( props );
    }

    render() {
        return (<div className="field">
            <div className="control has-icons-left has-icons-right">
                <input onChange={ this.props.handleUserInput } className="input is-large phone" type="text" name="phone" value={this.props.value} ></input>
            </div>
        </div>);
    }
}

class ContactForm extends Component {

    constructor( props ) {
        super( props );
        this.state ={
            name: '',
            email: 'hello@',
            message: '',
            phone: '',
            formErrors: { name: null, email: null, message: null, phone: null },
            nameValid: false,
            emailValid: false,
            formValid: false,
            submitted: false,
            success: false,
            error: null,
            honeypot: false,
            submitting: false
        }
        this.env = this.props.data.site.env
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

    honeypot() {
        const { honeypot, phone } = this.state;
        this.setState({
            honeypot: !honeypot,

        }, () => { console.log( this.state ); });
        console.log( "PHONE! ", this.state );
    }

    handleSubmit( event ) {

        event.preventDefault();

        this.setState({
            submitting: true
        });

        const url = this.env === 'development' ? 'http://localhost:5000' : 'https://kencrocken.herokuapp.com';
        const { name, email, message, phone, honeypot } = this.state;
        console.log(this.env, url);

        if ( !!this.state.phone ) {

            this.honeypot();
        } else {
            axios.post( url, { name, email, message })
                .then( result => {
                    console.debug( result );
                    this.setState({
                        submitting: false,
                        submitted: true,
                        success: true
                    });
                })
                .catch( error => {
                    console.error( error );
                    this.setState({
                        submitting: false,
                        error : error
                    });
                });
        }

    }

    render() {

        return (<div className="contact-form">

            { this.state.submitting && <div className="loading">
            <div className="color-wrap is-clearfix">
                { Array.from({ length: 50 }, ( val, index ) => index ).map( ( value ) => {
                        return <div key={ value } className={ `box-${ value }` }></div>;
                    })
                }
            </div>
            <div className="is-clearfix">
                <p className="title is-6 has-text-centered">
                    { "Submitting ...".split('').map( ( letter, index ) => {
                        return(<span key={index} className={`title-letter-${index}`}>
                        { letter }</span>);
                    })}
                </p>
            </div>
            </div> }
            { !this.state.submitting && <p className="accent">Let's get that coffee.</p>}
            { this.state.error && <div className="notification is-danger">
                <button className="delete" onClick={ () => { this.setState({ error: null }) } }></button>
                <strong>Sorry, there seems to have been an error.  Please try again.</strong>
            </div> }

            { !this.state.submitting && !this.state.success && <form name="contactMe">
                <div className="field">
                    <div className={`control has-icons-left has-icons-right ${this.errorClass(this.state.formErrors.name)}`}>
                        <input onChange={ this.handleUserInput } type="text" className="input is-large has-icons-right" name="name" autoComplete="name" placeholder="Your name." value={this.state.name} required>
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
                        <input onChange={ this.handleUserInput } className="input is-large" type="email" name="email" autoComplete="email" placeholder="Your email." value={this.state.email} required></input>
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
                {/*  */}
                <HoneyPot handleUserInput={ this.handleUserInput } value={ this.state.phone }/>
                {/*  */}
                <div className="field">
                    <div className="control">
                        <button className="button is-tomato" disabled={!this.state.formValid} onClick={this.handleSubmit}>SUbmit</button>
                    </div>
                </div>
            </form>}

            { this.state.success && <div className="help-block valid has-text-centered">
                <img src="https://fillmurray.com/g/300/300" alt="Murray"></img>
                <h3>You're Awesome!</h3>
                <h4>Get back to you soon.</h4>
            </div> }
        </div>

        );
    }
}

export default WithJekyll(ContactForm);
