import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { WithJekyll } from './JekyllHOC';
import AnchorLink from './AnchorLinks';

class Brand extends Component {

    constructor( props ) {
        super( props );
        console.log( props );
    }

    render() {
        const image = `${this.props.image.link}s=${this.props.image.small}`;
        return (<div className="navbar-brand">
            <div className="navbar-item image is-64x64 navbar-image-override">
                <img alt="Ken Crocken" src="/assets/images/gear.png" />
            </div>
            <h1 className="navbar-item" >
                <a className="is-size-5-mobile is-size-4-tablet" href={ this.props.url }>
                    { this.props.title }
                </a>
            </h1>
            <a role="button" className={ this.props.menuOpen ?  "navbar-burger burger is-active" : "navbar-burger burger" } aria-label="menu" aria-expanded="false" onClick={this.props.burgerClick}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            <span className="is-clearfix"></span>
        </div>);
    }
}

class Menu extends Component {
    constructor( props ) {
        super( props );
    }

    componentWillMount() {

        // const links = [ 'about', 'projects', 'contact' ];
        // this.anchorLinks = links.map( link => {
        //     return {
        //         "title" : link,
        //         "url" : `#${link}`
        //     }
        // });
    }

    render() {
        const data = this.props.data;
        const socialLinks = data.social;
        console.log(socialLinks);
        // const anchorLinks = this.anchorLinks;
        return (
            <div className={ this.props.menuOpen ? "navbar-menu is-active" : "navbar-menu" }>
                {/* <div className="navbar-start">
                     {anchorLinks.length && anchorLinks.map( ( link, index ) => {

                            return <AnchorLink className="navbar-item is-size-6" key={ index } href={link.url}>
                                { link.title }
                                </AnchorLink>;
                        })
                    }
                </div> */}
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
}

class NavBar extends Component {

    constructor( props ) {

        super( props );
        console.log( props );
        this.site  = this.props.data.site;
        this.state = {
            open : false
        };
        this.handleBurgerClick = this.handleBurgerClick.bind( this );

    }

    componentWillMount(){

        console.log( this.props );
    }

    handleBurgerClick() {

        this.setState( prevState => ({
            open: !prevState.open
        }));

    };

    render() {
        const site = this.site;
        return (<Headroom
                disableInlineStyles
                className={ this.state.open ? 'frozen' : ''}
            >
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="container">
                    <Brand title={ site.data.nickname } url={ site.url } data={ site.data } image={ site.data.image } menuOpen={ this.state.open } burgerClick={ this.handleBurgerClick } />
                    <Menu menuOpen={ this.state.open } data={ site.data } />
                </div>
            </nav>
        </Headroom>
        );
    }
}


export default WithJekyll( NavBar );
