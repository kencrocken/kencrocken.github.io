import React, { Component } from 'react';

export function WithJekyll( WrappedComponent ) {

    return class extends Component {
        constructor( props ) {

            super( props );
            const data = window.siteData;
            this.state = {
                data : data
            };
            console.debug( "WithJekyll() data: ", this.state.data);

        }

        render() {
            const data = this.state.data;
            return <WrappedComponent data={ data } { ...this.props } />;

        }

    };
}
