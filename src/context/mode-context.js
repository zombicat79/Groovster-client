import React from 'react';

const { Consumer, Provider } = React.createContext();

class ModeProvider extends React.Component {
    state = {
        modeIsDark: false
    }

    toggleMode = () => {
        this.setState({ modeIsDark: !this.state.modeIsDark })
    }
 
    render() {
        const { modeIsDark } = this.state;
        const { toggleMode } = this;
        
        return(
            <Provider value={{toggleMode, modeIsDark}}>
                {this.props.children}
            </Provider>
        )
    }
}

const withMode = (WrappedComponent) => {

    return function (props) {
        return(
            <Consumer>
                { (value) => {
                    const { toggleMode, modeIsDark } = value;

                    return (
                        <WrappedComponent 
                        toggleMode={toggleMode} 
                        modeIsDark={modeIsDark}
                        {...props} />
                    )
                }}
            </Consumer>
        )
    }
}

export { ModeProvider, withMode };