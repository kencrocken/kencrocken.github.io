import React, { Component } from 'react';

const SITE_DATA = window.siteData;

export function WithJekyll( WrappedComponent ) {

    return class extends Component {
        render() {
            console.log('THIS');
            return <WrappedComponent data={ SITE_DATA } { ...this.props } />;
        }
    };
}
