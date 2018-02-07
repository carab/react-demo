# React features

[Original README.md](ORIGINAL_README.md).

## create-react-app

```sh
npx create-react-app react-demo
cd react-demo
npm run eject
```

## ES5/ES6

http://es6-features.org/

* String interpolation
* const/let
* Arrow function
* class
* Rest operator
* Enchanced object properties
* Destructuring

## Stateless Component

```js
import React, { Component } from 'react'

function Person({firstname, lastname}) {
  return (
    <p>Hello <strong>{firstname} {lastname}</strong></p>
  )
}

export default Person
```

```js
import Person from './Person'

<Person firstname="John" lastname="Doe"/>
```

## static

```js
class Person extends Component {
  static defaultProps = {
    firstname: 'Unknown',
    lastname: 'person',
  }

  render() {
    const {firstname, lastname} = this.props

    return (
      <p>Hello <strong>{firstname} {lastname}</strong></p>
    )
  }
}
```

```js
<Person/>
```

## Dynamic import()

### Simple usage

```js
{
  "firstname": "John",
  "lastname": "Doe"
}
```

```js
class App extends Component {
  state = {
    person: null
  }

  handleClick = () => {
    import('./johndoe')
      .then((person) => {
        this.setState({person})
      })
      .catch(err => {
        // Handle failure
      })
  }

  render() {
    const {person} = this.state

    return (
      <div className="App">
        <button type="button" onClick={this.handleClick}>Load Person</button>
        <Person {...person}/>
      </div>
    )
  }
}
```

### With react-loadable

```sh
npm install react-loadable --save
```

```js
import Loadable from 'react-loadable'

const LoadablePerson = Loadable({
  loader: () => import('./Person'),
  loading: () => 'Loading',
});
```

```js
{person ? <LoadablePerson {...person}/> : null}
```

# async/await instead of Promise

```js
handleClick = async () => {
  const person = await import('./data/johndoe')
  this.setState({person})
}
```

```js
const [intl, intlLocaleDataEn, intlLocaleDataFr] = [
  await import(/* webpackChunkName: "intl" */ 'intl'),
  await import(/* webpackChunkName: "intl" */ 'intl/locale-data/jsonp/en.js'),
  await import(/* webpackChunkName: "intl" */ 'intl/locale-data/jsonp/fr.js'),
]
```

## Decorators

```sh
npm install babel-plugin-transform-decorators-legacy --save-dev
```

```js
{
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```

```js
import React from 'react'

const style = {
  color: 'red',
}

function addStyle(Component) {
  return function(props) {
    return <Component style={style} {...props}/>
  }
}

export default addStyle
```

```js
import addStyle from './hoc/addStyle'

@addStyle
class Person extends Component {
  static defaultProps = {
    firstname: 'Unknown',
    lastname: 'person',
    style: {},
  }

  render() {
    const {firstname, lastname, style} = this.props

    return (
      <p style={style}>Hello <strong>{firstname} {lastname}</strong></p>
    )
  }
}
```

## Portal

```js
<div>
  Text here
  <div id="person-container"></div>
  Text there
</div>
```

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import addStyle from './hoc/addStyle'

@addStyle
class Person extends Component {

  static defaultProps = {
    firstname: 'Unknown',
    lastname: 'person',
    style: {},
  }

  el = document.getElementById('person-container')

  render() {
    const {firstname, lastname, style} = this.props

    return ReactDOM.createPortal(
      <p style={style}>Hello <strong>{firstname} {lastname}</strong></p>,
      this.el
    )
  }
}

export default Person
```

## Fragment

```js
class Items extends Component {
  render() {
    return (
      <React.Fragment>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </React.Fragment>
    )
  }
}
```

```js
<ul>
  <Items/>
</ul>
```

```js
<>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</>
```

## Error boundary

```js
class ErrorBoundary extends Component {
  state = {error: null}

  componentDidCatch(error) {
    this.setState({error})
  }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong : {this.state.error}</h1>
    }

    return this.props.children
  }
}
```

```js
class BrokenComponent extends Component {
  state = {broken: false}

  componentDidMount() {
    setTimeout(() => {
      this.setState({broken: true})
    }, 2000)
  }

  render() {
    if (this.state.broken) {
      throw 'Ohoh I am broken'
    }

    return <p>Everything is fine</p>
  }
}
```

```js
<ErrorBoundary>
  <BrokenComponent/>
</ErrorBoundary>
```

# Links

## Patterns

https://levelup.gitconnected.com/react-component-patterns-ab1f09be2c82

## Types

https://reactjs.org/docs/typechecking-with-proptypes.html
https://flow.org/en/docs/react/
https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

## State

https://github.com/reactjs/react-redux
https://github.com/mobxjs/mobx-react
https://github.com/solkimicreb/react-easy-state

## ServerSide

https://github.com/zeit/next.js/

## Tests

https://facebook.github.io/jest/docs/en/tutorial-react.html