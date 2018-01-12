import React, { Component } from 'react';
import Ticker from './Ticker'
import axios from 'axios'
import _ from 'lodash'

class App extends Component {
  SYMBOLS = ['OMG', 'BTC', 'XRP']

  constructor(props){
    super(props)
    this.state = {}
  }

  //refactor
  extractPrice(data){
    let price_state = {}
    _.each(this.SYMBOLS, symbol => {
      price_state[symbol] = _.find(data, ['symbol', symbol]).price_thb
    })
    this.setState(price_state)
  }

  loadPrice(){
    let self = this
    axios.get('https://api.coinmarketcap.com/v1/ticker/?convert=THB')
    .then(function (response) {
      self.extractPrice(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount(){
    setInterval(this.loadPrice.bind(this), 3000)
  }

  render() {
    return (
      <div>
        {
          _.map(this.SYMBOLS, symbol => <Ticker symbol={symbol} price={this.state[symbol]}/>)
        }
      </div>
    );
  }
}

export default App;