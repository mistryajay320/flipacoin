import React, {Component} from 'react';
import {choice} from './Helpers';
import Coin from './Coin';
import './CoinContainer.css'

class CoinContainer extends Component {
    static defaultProps = {
        coins: [
            {side: "tails", imgSrc: "https://qph.fs.quoracdn.net/main-qimg-148ae81e6fe0500e130fb547026a9b26"},
            {side: "heads", imgSrc: "https://qph.fs.quoracdn.net/main-qimg-9c81a54813716fccd8e3608ab2f51dcf"}
        ]
    };
    constructor(props){
        super(props);
            this.state={
                currCoin: '',
                nFlips: 0,
                nHeads: 0,
                nTails: 0,
                flipping: false
            };
            this.handleClick=this.handleClick.bind(this);
        }
    flipCoin(){
        this.setState(st=>{
            return{
                nFlips: st.nFlips +1,
                flipping: true
            }
        });
    const newCoin = choice(this.props.coins);
        setTimeout(()=>{
            this.setState(stt=>{
                return{
                flipping: false,
                currCoin: newCoin,
                nHeads: stt.nHeads + (newCoin.side === 'heads'? 1 :0),
                nTails: stt.nTails + (newCoin.side ==='tails'? 1: 0),
                }
            })
        },650);
    }

    handleClick(e){
        this.flipCoin();
    }
    render(){
        return(
            <div className="CoinContainer">
                <h2>Let's Flip A Coin</h2>
                {this.state.flipping? <h3 className='TempText'>SPINNING!</h3> :
                (this.state.currCoin && <Coin info={this.state.currCoin}/>) }
                <button onClick={this.handleClick} disabled={this.state.flipping}>
                    {this.state.flipping? 'Flipping...' : 'Flip Me!'}
                    </button>
                <p className='ResultFont'>
                    Out of {this.state.nFlips} flips,
                    there have been {this.state.nHeads} heads
                    and {this.state.nTails} tails.
                </p>
            </div>
        )
    }
}
export default CoinContainer;