import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../actions/ProductActions';
import map from 'lodash/map';
import '../styles/CartStyle.css';
import Image from "../images/image.png";
import { constants } from '../constants';

class Cart extends Component {

    state = {
        numbers: [],
        prices: [],
        sum: null,
        s: null,
    }

    componentDidMount() {
        this.props.dispatch(getProducts());
    };
    componentDidUpdate(prevProps) {
        if (this.props.products && !prevProps.products) {
            let numbers = this.props.products.map((product, index) => 1)
            let prices = this.props.products.map((product) => product.price)
            this.setState({
                numbers,
                prices,
            })
        }
    }

    handleChange = (index) => {
        let numbers = [...this.state.numbers]
        numbers[index] = event.target.value
        if (numbers[index] > 0 && numbers[index] < 50) {
            this.setState({
                numbers
            });
        }
    };

    handleMove = (index, step) => {
        let numbers = [...this.state.numbers]
        numbers[index] = numbers[index] + step
        if (numbers[index] > 0 && numbers[index] <= 50) {
            this.setState({
                numbers
            })
        }
    }

    render() {
        const { products } = this.props;
        console.log('products', products);
        console.log('prices', this.state.prices)
        return (
            <div className='container'>
                {products &&
                    map(products, (product, index) => (
                        <div className="card" key={product.id}>
                            <div className='img'>
                                <img src={Image} alt={product.image} />
                            </div>
                            <div className='description'>
                                <h3>{product.title}</h3>
                                <p>{product.about}</p>
                            </div>
                            <div className='number'>
                                <button className='btnMinus' onClick={() => this.handleMove(index, -1)}>-</button>
                                <input
                                    type="number"
                                    name='number'
                                    min='1'
                                    max='50'
                                    value={this.state.numbers[index] || 1}
                                    onChange={() => this.handleChange(index)}
                                />
                                <button className='btnPlus' onClick={() => this.handleMove(index, +1)}>+</button>
                            </div>
                            <div className='price'>
                                <p>{product.price * (this.state.numbers[index] || 1)} €</p>
                            </div>
                        </div>
                    ))}
                <div className='total'>
                    <div className="sum">
                        <p> €</p>
                    </div>
                    <button className="btnBuy">BUY</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { products } = state.productReducer;
    return {
        products,
    }
}

export default connect(mapStateToProps)(Cart);

