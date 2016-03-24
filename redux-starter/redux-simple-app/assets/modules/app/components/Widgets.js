import React, { Component, PropTypes } from 'react';

export default class Widgets extends Component {
    
    render() {
        const { widgetData } = this.props;
        return (
            <section className="widgets-page">
                <h1>App: Widgets</h1>    
                <ul>
                    {widgetData.map((value, i) => {
                        return (
                            <li key={i}>{value}</li>
                        );
                    })}   
                </ul>
            </section>
        );
    }
}

Widgets.propTypes = {
    
};
