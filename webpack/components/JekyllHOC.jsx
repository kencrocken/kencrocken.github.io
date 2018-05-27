import React, { Component } from 'react';

export function WithJekyll( WrappedComponent ) {

    return class extends Component {
        constructor( props ) {

            super( props );
            this.data = window.siteData;
            this.state = {
                data : this.data
            };
            console.log(this.state);

        }

        render() {
            const data = this.state.data;
            return <WrappedComponent data={ data } { ...this.props } />;

        }

    };
}
