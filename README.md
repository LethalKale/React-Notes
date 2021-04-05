- [Setup](#setup)
  - [Typescript](#typescript)
- [Components](#components)
  - [Functional](#functional)
    - [In Typescript, should I use React.FC?](#in-typescript-should-i-use-reactfc)
  - [Class](#class)
    - [Typescript](#typescript-1)
- [JSX](#jsx)
- [Events in Typescript](#events-in-typescript)
- [State vs props](#state-vs-props)
- ['children' prop](#children-prop)
- [Typescript, pass components as props](#typescript-pass-components-as-props)
- [Typechecking & default values](#typechecking--default-values)
  - [defaultProps](#defaultprops)
  - [propTypes](#proptypes)
    - [Typescript](#typescript-2)
- [React Fragment](#react-fragment)
- [`this` on Class Components](#this-on-class-components)
  - [use bind](#use-bind)
  - [don't use bind](#dont-use-bind)
- [State](#state)
  - [Functional - useState](#functional---usestate)
  - [Class](#class-1)
    - [setState](#setstate)
- [Lifecycle methods](#lifecycle-methods)
  - [Class](#class-2)
  - [Function (useEffect)](#function-useeffect)
    - [optional second argument](#optional-second-argument)
- [Refs](#refs)
  - [Class components (createRef)](#class-components-createref)
    - [Typescript](#typescript-3)
  - [Functional components (useRef hook)](#functional-components-useref-hook)
    - [Typescript](#typescript-4)
- [useReducer](#usereducer)
- [List and keys](#list-and-keys)
- [Forms](#forms)
  - [Controlled Component](#controlled-component)
- [HOC (Higher-order Components)](#hoc-higher-order-components)
- [Render props](#render-props)
- [React.PureComponent](#reactpurecomponent)
  - [vs React.Component](#vs-reactcomponent)
  - [Don't use with nested objects](#dont-use-with-nested-objects)
  - [Prevents re-rendering](#prevents-re-rendering)
    - [prevents re-rendering if value didn't changed](#prevents-re-rendering-if-value-didnt-changed)
    - [prevents unnecessary re-rendering](#prevents-unnecessary-re-rendering)
  - [React.memo](#reactmemo)
- [Environment variables](#environment-variables)
- [Context](#context)
  - [Steps](#steps)
  - [Functional components](#functional-components)
  - [Class components](#class-components)
- [Styling in React](#styling-in-react)
  - [Import CSS](#import-css)
  - [inline](#inline)
  - [CSS modules](#css-modules)
  - [Styled-components](#styled-components)

# Setup

- `npx create-react-app my-app`
- `npm run start` = live server

## Typescript 

- `tsx` file extension
- at `tsconfig.json`, set `"jsx": "react"`

# Components

- React components can be written as a function or class

## Functional

```js
function Header({ title }) {
  return (
    <h1>{ title }</h1>
  );
}
```

### In Typescript, should I use React.FC?

- `React.FC` isn't the preferred way to type a functional React component, it's better to let type be implicit
- [read more](https://github.com/typescript-cheatsheets/react/blob/main/README.md#function-components)

## Class

```js
class Header extends React.Component {
  render() {
    return (
      <h1>{ this.props.title }</h1>
    );
  }
}
```

### Typescript

```tsx
class App extends React.Component<AppProps, AppState> {}
```

# JSX

- to use HTML keywords that conflict with JS, use camelCase
  - e.g. class => className, for => htmlFor

# Events in Typescript

- `function handleChange(e: React.ChangeEvent<HTMLInputElement>)`

# State vs props

- props (short for “properties”) and state are both plain JavaScript **objects**
- both hold information that influences the output of render, they are different in one important way:
  - **props** = passed to the component and can't be directly changed by this component
  - **state** = managed within (can be change by) the component

# 'children' prop

```js
// Header.js
function Header({ children }) { // props.children
  return (
    <header>
      { children }
    </header>
  );
}

// App.js
function App() {
  const title = "My title!";

  // Title will be passed to Header's `props.children`
  return (
    <Header>
      <Title title={title} />
    </Header>
  );
}
```

# Typescript, pass components as props

- use `React.ReactNode`
- [read more](https://github.com/typescript-cheatsheets/react#useful-react-prop-type-examples)

# Typechecking & default values

## defaultProps

```js
// will soon be deprecated for functional components,
// prefer instead ES6 default parameters
Header.defaultProps = {
  title: "my default title",
};
```

## propTypes

- any error will appear in the console

```js
import PropTypes from "prop-types";

Header.propTypes = {
  title: PropTypes.string.isRequired,
}
```

### Typescript

- both check types, Typescript at compile time and PropTypes at runtime
- **Typescript is enough**

```tsx
import PropTypes, { InferProps } from 'prop-types';

function Header({ title }: InferProps<typeof Header.propTypes>) {
  return (
    <>  
      <h1>{title}</h1>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,  
};
```

# React Fragment

```js
// a component can only return one single element
// fragments let you group a list of children without adding extra nodes to the DOM

<React.Fragment>
  <td>Hello</td>
  <td>World</td>
</React.Fragment>

// shorter
<>
  <td>Hello</td>
  <td>World</td>
</>
```

# `this` on Class Components

## use bind

- 2 methods:
  - bind **inline** (creates a function at every render, therefore not recommended) = `onChange={this.handleChange.bind(this)}`
  - bind function inside **constructor** = `this.handleChange = this.handleChange.bind(this);`

## don't use bind

- to avoid use `bind`, use instead:
  - declare function with **public class field** (experimental feature transpiled by babel); `public myF = () => {`
  - call function with an **arrow functions**
    - however, with this syntax a different callback is created at every render which may cause slowdown specially if callback is being passed as a prop ([read more](https://reactjs.org/docs/handling-events.html)) 

# State

## Functional - useState

- Prior to React 16.8, functional components were stateless, now they can hold state via hooks

```js
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("My title");

  // setTitle can also accept a function
  // this is useful to catch previous state value
  const changeTitle = () => setTitle("Title changed");

  return (
    <>
      <Header title={ title } changeTitle={ changeTitle } />
    </>
  );
}
```

## Class

```js
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Header",
      changeTitle: () => this.setState({
        title: "Title changed",
      }),
    };
  }

  render() {
    return (
      <Header title={ this.state.title } changeTitle= { this.state.changeTitle } />
    );
  }
}
```

### setState

- accepts **an object or a function**
- the function receives two arguments (state and props), this is the recommended method when you need to use the previous state or props

# Lifecycle methods

## Class

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Header",
      changeTitle: () => this.setState({
        title: "Title changed",
      }),
    };
  }

  componentDidMount() {
    console.log("mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updated");
  }

  render() {
    return (
      <Header title={ this.state.title } changeTitle= { this.state.changeTitle } />
    );
  }
}
```

## Function (useEffect)

- useEffect can be used to perform side effects and replicate lifecycle behavior
- runs after every render

```js
import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("My title");
  const changeTitle = () => setTitle("Title changed");

  useEffect(() => {
    console.log("rendered");
  });

  return (
    <>
      <Header title={ title } changeTitle={ changeTitle } />
    </>
  );
}
```

### optional second argument

- array of variables
- useEffect's callback only runs after one of the specified values at the second argument has changed
- if array is empty, useEffect runs only once (like `componentDidMount`)

# Refs

- used to create DOM refs (i.e. access a child imperatively)

## Class components (createRef)

```js
class Subheader extends React.Component {
  constructor(props) {
    super(props);

    this.headerRef = React.createRef();
  }

  handleClick() {
    this.headerRef.current.innerText += '!';
  }

  render() {
    return (
      <>
        <h3 ref={this.headerRef} onClick={this.handleClick.bind(this)}>
          {this.props.children}
        </h3>
      </>
    );
  }
}
```

### Typescript

```tsx
class Counter extends React.Component {
  headerRef = React.createRef<HTMLHeadingElement>();

  handleClick() {
    if (this.headerRef.current) {
      const next = Number(this.headerRef.current.innerText) + 1;  
      this.headerRef.current.innerText = next.toString();
    }
  }

  render() {
    return (
      <>    
        <h1 ref={this.headerRef} onClick={this.handleClick.bind(this)}>
          0
        </h1>
      </>
    );
  }
}
```

## Functional components (useRef hook)

- besides DOM ref, useRef also can be used to preserve a value across re-renders
- returns a mutable object with only 1 property (`current`)

```js
// use 1: DOM ref
function Subheader({ children }) {
  const headerRef = React.useRef(null);

  function handleClick() {
    headerRef.current.innerText += '!';
  }

  return (
    <>
      <h3 ref={headerRef} onClick={handleClick}>
        {children}
      </h3>
    </>
  );
}

// use 2: preserving value
function Counter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);

  // let renderCount = 0; // won't work, variable gets redeclared at every re-render
  const renderCount = React.useRef(0);

  React.useEffect(() => {
    console.log(`rendered ${(renderCount.current += 1)} times`);
  });

  return (
    <>
      <h1 onClick={increment}>{count}</h1>
    </>
  );
}
```

### Typescript

```tsx
function Counter() {
  const headerRef = React.useRef<HTMLHeadingElement>(null);

  function handleClick() {
    if (headerRef.current) {
      const next = Number(headerRef.current.innerText) + 1;  
      headerRef.current.innerText = next.toString();
    }
  }

  return (
    <>  
      <h1 ref={headerRef} onClick={handleClick}>
        0
      </h1>
    </>
  );
}
```

# useReducer

- alternative to **useState**, uses same pattern used in **Redux** 
- is preferable to useState when you have **complex state logic**
- which involves multiple sub-values or when the next state depends on the previous one

```js
type counterReducerAction = { type: 'increment' } | { type: 'decrement' };

// (state, action) => newState
function counterReducer(state: number, action: counterReducerAction) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  //useReducer(reducer, initialState);
  const [count, dispatch] = React.useReducer(counterReducer, 0);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

# List and keys

- when creating a list of elements, it's recommended to provide a key prop
- elements inside `map()` need a prop called key, not they children
  - if you extract a ListItem component, you should keep the key on the `<ListItem />` elements in the array rather than on the `<li>` element in the ListItem
- it must be unique; but use index (which is the default behavior of React), may not be the best idea ([read more](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318))

# Forms

## Controlled Component

- pure html forms and inputs are by default uncontrolled
- React state must be the “single source of truth”
- an input form element whose value is controlled by React is called a “controlled component”

```js
function Form() {
  const [input, setInput] = React.useState('placeholder');

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <form>
      <input type="text" value={input} onChange={changeInput} />
    </form>
  );
}
```

# HOC (Higher-order Components)

```js
const Header = () => <h1>Header</h1>;

// HOC = a function that takes a component and returns a new component
// by convention, HOC name usually starts w/ 'with'
function withRedColor(Comp) {
  return class extends React.Component {
    render() {
      return (
        <div style={{ color: 'red' }}>
          <Comp />
        </div>
      );
    }
  };
}

// creates a new component from the HOC
const RedHeader = withRedColor(Header);

function App() {
  return <RedHeader />;
}
```

# Render props

```js
function render() {
  return <h1>{this.state.value}</h1>;
}

// a component with a render prop takes a function that returns a React element
// and calls it instead of implementing its own render logic
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'from Header' };
  }

  render() {
    return this.props.render.call(this);
  }
}

const App = () => <Header render={render} />;
```

# React.PureComponent

- in some cases, can boost performance

## vs React.Component

- similar to `React.Component`, but implements `shouldComponentUpdate` which performs a shallow comparison of prop and state

## Don't use with nested objects

- only use PureComponent when you expect to have props and state with **primitive values** (not arrays or objects)
- complex data structures, may produce false-negatives for deeper differences

## Prevents re-rendering

- **prevents re-rendering** if prop or state has been updated with the same values
  - if they're assigned the same values or if parent component re-render but passed the same props

### prevents re-rendering if value didn't changed

```js
class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "test",
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        value: "test", // change it to the same value
      });
    }, 1000);
  }

  render() {
    console.log("rendered"); // if PureComponent, will log only once because change state to the same value doesn't trigger new render
    return <h1>Hello, world!</h1>;
  }
}
```

### prevents unnecessary re-rendering

```js
class Child extends React.PureComponent {
  render() {
    // run only once when component is pure (and twice otherwise)
    // PureComponent recognizes that the changes in the App's state didn't affect any of the props passed to this component
    console.log("Child rendered");

    return (
      <h1>{ this.props.value }</h1>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: "one",
      val2: "two",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        val1: "one...",
      });
    }, 1000);
  }

  render() {
    console.log("App rendered");
    return (
      <>
        <h1>{ this.state.val1 }</h1>
        <Child  value={this.state.val2} />
      </>
    );
  }
}
```

## React.memo

- `const MyPureComp = React.memo(MyComp);`
- is a higher order component
- it's similar to `PureComponents` but for function components
- performs shallow comparison, accepts a comparison function as optional second argument

# Environment variables

- create a `.env` file in the root
- add the variables (must start with 'REACT_APP'):

```
REACT_APP_TEST = "test 1"
```

- **reload** the server

# Context

- is useful when sharing global data or data that needs to be accessible by many components at different nesting levels
- should be use sparingly because makes reuse more difficult

## Steps

1. `React.createContext()` and export the `Consumer`
2. Wrap component(s) inside `Provider`
3. Inside a wrapped component (or one of its child), use the `Consumer`

## Functional components

```tsx
interface MyContextInterface {
  title: string;
}

// createContext takes the default context value
// this default value will only be used inside Consumers with no matching Provider
const MyContext = React.createContext<Partial<MyContextInterface>>({});

function Heading() {
  // // useContext alternative
  // const context = React.useContext(MyContext)!;
  // return <h1>{context.title}</h1>;

  // Context.Consumer alternative
  return (
    <MyContext.Consumer>
      {(context) => <h1>{context.title}</h1>}
    </MyContext.Consumer>
  );
}

function Header() {
  const propsToPass = {
    title: 'My title...',
  };

  return (
    <MyContext.Provider value={propsToPass}>
      <Heading />
    </MyContext.Provider>
  );
}
```

## Class components

- set the context in a class components by:
  - `Class.contextType`, after class declaration
  - `static contextType`, inside class declaration
- **typescript**: `context!: React.ContextType<typeof MyContext>;`

# Styling in React

## Import CSS

- `import "./style.css"`
- this will import global css, to locally scoped use CSS modules

## inline

- `style` attribute accepts a JavaScript object with camelCased properties rather than a CSS string

```js
<h1 style={{ color: "red", backgroundColor: "pink" }}>Hello!</h1>

//

const headerStyle = { color: "green", backgroundColor: "lightgreen" };

function App() {
  return (
    <>
      <h1 style={headerStyle}>Hello!</h1>
    </>
  );
}
```

## CSS modules

- it's a styling convention that let you use the same CSS class name in different files without worrying about naming clashes (everything is locally scoped by default)
- file must be named `[name].module.css`

```css
/* h1.module.css */
.title {
  color: red;
  background-color: pink;
}
```

```js
import styles from "./h1.module.css";

function App() {
  return (
    <>
      <h1 className={styles.title}>One</h1>
      <h1>Two</h1>
    </>
  );
}
```

## Styled-components

- `npm i styled-components`
- is a **CSS-in-JS** library
- when you define your styles, you're actually creating a normal React component, that has your styles attached to it

```js
import styled, { css } from "styled-components";

const Header = styled.h1`
  color: red;
  background-color: pink;
`;

function App() {
  return (
    <>
      <Header>Header</Header>
    </>
  );
}
```
