import React from 'react'
import addStyle from './addStyle'

@addStyle('pink')
class Person extends React.Component {
    static defaultProps = {
        firstname: 'John',
        lastname: 'Doe',
    }
    
    render() {
        const {firstname, lastname, style} = this.props
        return <p style={style}>
            Bonjour {firstname} {lastname}
        </p>
    }
}

export default Person