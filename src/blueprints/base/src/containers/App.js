import React from 'react';
import Counter from '../components/Counter';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Counter increment={1} color="pink" />
        <Counter increment={5} color="darkred" />
      </div>
    );
  }
}

