import React, { Component } from 'react'

class ContactForm extends Component {

    constructor( props ) {
        super( props );
        this.state ={
            name: '',
            email: '',
            message: '',

        }

    }

    render() {

        return (<div className="contact-form">
            <form name="contactMe">
                <div className="field">
                    <div className="control">
                        <input type="text" className="input is-medium has-icons-right" name="name" placeholder="Your name." required>
                        </input>
                    </div>
                    <p className="help">This is a help text</p>
                </div>
                <div className="field">
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email input" value="hello@"></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        {/* <span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span> */}
                    </div>
                    <p className="help is-danger">This email is invalid</p>
                </div>
                <div className="field">
                    <div className="control">
                        <textarea className="textarea" placeholder="Textarea"></textarea>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-tomato">Submit</button>
                    </div>
                </div>
                <div className="help-block invalid">
                    <p>
                        <i className="fa fa-bug fa-lg fa-fw"></i>
                        Can I at least get your name?
                    </p>
                </div>
            </form>

            <div className="help-block valid">
                <img src="http://fillmurray.com/g/300/300" alt="Murray"></img>
                <h3>You're Awesome!</h3>
                <h4>Get back to you soon.</h4>
            </div>
        </div>

        );

    }
}

export default ContactForm;
