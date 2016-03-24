import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
    render() {
        return (
            <div className="app">
                <nav>
                    <Link to="/">Home</Link><br/>
                    <Link to="/widgets">Widgets</Link><br/>
                    <Link to="/users">Users</Link>
                </nav>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default App;

