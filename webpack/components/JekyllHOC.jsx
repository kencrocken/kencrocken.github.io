import React, { Component } from 'react';

const SITE_DATA = window.siteData;

/**
 * Pulls in the siteData placed on the window element in the DOM in the default layout
 * @param {ReactElement} WrappedComponent 
 * @returns ReactElement
 */
export function WithJekyll( WrappedComponent ) {

    return class extends Component {
        render() {
            return <WrappedComponent data={ SITE_DATA } { ...this.props } />;
        }
    };
}
