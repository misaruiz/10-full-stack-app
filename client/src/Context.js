import React, { useState } from 'react';
import Data from './Data';

export const Context = React.createContext();

export const Provider = ({children}) => {

    const data = new Data();

    const value = {
        data
    }

        return (
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        );

    // getCourses = async () => {
    //     const courses = await this.data.getCourses();
    //     return courses;
    // }
    
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