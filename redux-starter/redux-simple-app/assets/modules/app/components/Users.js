import React, { Component, PropTypes } from 'react';

export default class Users extends Component {
    render() {
        const { users } = this.props;
        return (
            <section className="users-page">
                <h1>App: Users</h1>
                <ul>
                  {users.map((user, i) => {
                      return (
                          <li key={user.id}>
                              <a href="#" onClick={this.props.onUserClick}>
                                  {user.name}
                              </a>
                          </li>
                      );
                  })}
                </ul>
            </section>
        );
    }
}

Users.propTypes = {

};
