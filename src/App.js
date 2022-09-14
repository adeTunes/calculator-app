import { Component } from "react";
import './css/styles.css'
import Button from "./components/Button";

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       current: '0',
       previous: [2,3]
    }
  }
  reset = () => {
    this.setState({current: '0'})
  }
  addToCurrent = (symbol) => {
    if(this.state.current === '0' && symbol === 0){
      this.setState({current: +this.state.current + (symbol === 0 && symbol)})
    }
    else if((this.state.current === '0' || this.state.current === 0) && (symbol === 'X' || symbol === '/' || symbol === '='))
      this.reset()
    else{
      if((this.state.current === '0' || this.state.current === 0)){
        if(symbol === '/' || symbol === '+' || symbol === '-' || symbol === 'X')
        this.setState({current: this.state.current.replace('0', '') + " " + symbol + " "})
        else this.setState({current: this.state.current.replace('0', '') + symbol})
      } 
      else{
        if(symbol === '/' || symbol === '+' || symbol === '-' || symbol === 'X')
        this.setState({current: this.state.current + " " + symbol + " "})
        else this.setState({current: this.state.current + symbol})
      }
    }
  }

  componentDidUpdate() {
    if(!this.state.current)
    this.setState({current: '0'})
  }

  // handleInput = (e) => {
  //   if(this.state.current === '0' || this.state.current === 0)
  //     this.setState({current: String(e.target.value)})
  // }

  evaluate = (symbol) => {
    if(this.state.current !== '0' && (this.state.current.includes('/') || this.state.current.includes('X') || this.state.current.includes('-') || this.state.current.includes('+')))
    // eslint-disable-next-line
    this.setState({current: eval(this.state.current.replace('X', '*'))})
  }

  delete = () => {
    if(this.state.current !== '0'){
      let newCurrent = String(this.state.current).split('')
      newCurrent.pop()
      this.setState({current: newCurrent.join('')})
    }
  }

  render(){
    const buttons = [
      {symbol: 'C', cols: 2, action: this.reset},
      {symbol: '<=', cols: 1, action: this.delete},
      {symbol: '/', cols: 1, action: this.addToCurrent},
      {symbol: '7', cols: 1, action: this.addToCurrent},
      {symbol: '8', cols: 1, action: this.addToCurrent},
      {symbol: '9', cols: 1, action: this.addToCurrent},
      {symbol: 'X', cols: 1, action: this.addToCurrent},
      {symbol: '4', cols: 1, action: this.addToCurrent},
      {symbol: '5', cols: 1, action: this.addToCurrent},
      {symbol: '6', cols: 1, action: this.addToCurrent},
      {symbol: '-', cols: 1, action: this.addToCurrent},
      {symbol: '1', cols: 1, action: this.addToCurrent},
      {symbol: '2', cols: 1, action: this.addToCurrent},
      {symbol: '3', cols: 1, action: this.addToCurrent},
      {symbol: '+', cols: 1, action: this.addToCurrent},
      {symbol: 0, cols: 2, action: this.addToCurrent},
      {symbol: '.', cols: 1, action: this.addToCurrent},
      {symbol: '=', cols: 1, action: this.evaluate},
    ]
    let { current } = this.state
    return(
        <div className="main-container">
          <input type="text" className="result" /*onChange={this.handleInput}*/ readOnly value={current} />
          <div className="grid-container">
          {
            buttons.map((btn, i) => (
              <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)}/>
              ))
            }
          </div>
        </div>
    )
  }
}

export default App
