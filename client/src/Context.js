import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
      emailAddress: '',
      showNotification: false,
      notificationMessage: '',
    };
  }

  render() {
    const { authenticatedUser, emailAddress, showNotification, notificationMessage } = this.state;

    const value = {
      authenticatedUser,
      emailAddress,
      showNotification,
      notificationMessage,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        setShowNotification: this.setShowNotification
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    user.password = password;
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          emailAddress,
        }
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signUp = async (body) => {
    const user = await this.data.createUser(body);
    if (user !== null) {
      user.password = body.password;
      this.setState(() => {
        return {
          authenticatedUser: user,
          emailAddress: body.emailAddress,
        }
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }


  setShowNotification = (message) => {
    this.setState({ 
      showNotification: !this.state.showNotification,
      notificationMessage: message
    });
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

