import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { WithJekyll } from './JekyllHOC';

const Brand = (props) => {
    const image = `${props.image.link}s=${props.image.small}`;
    console.log(props);
    return (
        <div className="navbar-brand">
            <div className="navbar-item image navbar-image-override">
                <img alt={props.title} src="/assets/images/gear.png" />
            </div>
            <h1 className="navbar-item" >
                <a href={ props.url }>
                    { props.title } | { props.profession }
                </a>
            </h1>
            <a role="button" className={ props.menuOpen ?  "navbar-burger burger is-active" : "navbar-burger burger" } aria-label="menu" aria-expanded="false" onClick={props.burgerClick}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            <span className="is-clearfix"></span>
        </div>
    );
}

const Menu = (props) => {

    const data = props.data;
    const socialLinks = data.social;

    return (
        <div className={ props.menuOpen ? "navbar-menu is-active" : "navbar-menu" }>
            <div className="navbar-end">
                <div className="navbar-item social-links">
                    <div className="field is-grouped">
                        { socialLinks.length && socialLinks.map( ( link, index ) => {
                            return <p key={ index } className="control link">
                                <a className={`button is-circle ${link.site}`} href={ link.link }>
                                    <span className="icon">
                                        <i className={ link.icon }></i>
                                    </span>
                                </a>
                            </p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

class NavBar extends Component {

    constructor( props ) {

        super( props );
        this.site  = this.props.data.site;
        this.state = {
            open : false
        };
        this.handleBurgerClick = this.handleBurgerClick.bind( this );

    }

    handleBurgerClick() {

        this.setState( prevState => ({
            open: !prevState.open
        }));

    };

    render() {
        const site = this.site;
        console.log(site)
        return (
            <Headroom
                disableInlineStyles
                style={{height: "100px"}}
                className={ this.state.open ? 'frozen' : ''}
            >
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="container">
                    <Brand title={ site.data.nickname } profession={ site.data.profession } url={ site.url } data={ site.data } image={ site.data.image } menuOpen={ this.state.open } burgerClick={ this.handleBurgerClick } />
                    <Menu menuOpen={ this.state.open } data={ site.data } />
                </div>
            </nav>
        </Headroom>
        );
    }
}


export default WithJekyll( NavBar );
