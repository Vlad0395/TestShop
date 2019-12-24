import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../actions/ProductActions';
import map from 'lodash/map';
import '../styles/CartStyle.css';
import Image from "../images/image.png";

class Cart extends Component {

    state = {
        numbers: [],
        prices: [],
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
        let prices = [...this.state.prices]
        prices[index] = this.props.products[index].price * numbers[index]
        if (numbers[index] > 0 && numbers[index] <= 50) {
            this.setState({
                numbers,
                prices,
            })
        }
    }

    render() {
        const { products } = this.props;
        let sum = 0;
        this.state.prices.forEach(price => { sum += price })

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
                                <p
                                    name='number'
                                    // value={this.state.numbers[index] || 1}
                                    onChange={() => this.handleChange(index)}
                                >{this.state.numbers[index] || 1}</p>
                                <button className='btnPlus' onClick={() => this.handleMove(index, +1)}>+</button>
                            </div>
                            <div className='price'>
                                <p>{product.price * (this.state.numbers[index] || 1)} €</p>
                            </div>
                        </div>
                    ))}
                <div className='total'>
                    <div className="sum">
                        <p>
                            {sum} €
                        </p>
                    </div>
                    <Link to="/shipping">
                        <button
                            className="btnBuy"
                            sum={sum}
                        >
                            BUY
                        </button>
                    </Link>
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

