import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProducts, saveSum, DeleteProduct } from '../actions/ProductActions';
import map from 'lodash/map';
import CartItem from './CartItem';

class Cart extends Component {

    state = {
        numbers: [],
        prices: [],
    };

    componentDidMount() {
        this.props.dispatch(getProducts());
    }

    componentDidUpdate(prevProps) {
        if (this.props.products && !prevProps.products) {

            if (!this.state.numbers.length && !this.state.prices.length) {
                let numbers = this.props.products.map((product, index) => 1)
                let prices = this.props.products.map((product) => product.price)
                this.setState({
                    numbers,
                    prices,
                })
            }
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
    };

    handleBuy = (sum) => {
        this.props.dispatch(saveSum(sum))
    }
    handleRemove = (id, index) => {
        this.props.dispatch(DeleteProduct(id))
        //need refactoring, because you change state. And it will change data without setState
        let numbers = [...this.state.numbers]
        let prices = [...this.state.prices]
        numbers.splice(index, 1)
        prices.splice(index, 1)
        this.setState({
            numbers,
            prices,
        })
    }

    render() {
        const { products } = this.props;
        let sum = 0;
        this.state.prices.forEach(price => { sum += price })

        return (
            <Container>
                {products ?
                    map(products, (product, index) => (
                        <CartItem
                            product={product}
                            index={index}
                            handleChange={this.handleChange}
                            handleMove={this.handleMove}
                            handleRemove={this.handleRemove}
                            numbers={this.state.numbers}
                            key={product.id}
                        />
                    )) :
                    <CartItem />
                }
                <Total className='total'>
                    <div className="sum">
                        <p>
                            {sum} €
                        </p>
                    </div>
                    <Link to="/shipping">
                        <BtnBuy
                            sum={sum}
                            disabled={sum === 0}
                            onClick={() => this.handleBuy(sum)}
                        >
                            BUY
                        </BtnBuy>
                    </Link>
                </Total>
            </Container>
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

const Container = styled.div`
    width: 35%;
    margin: 0 auto;
    @media screen and (max-width: 1280px) {
        width: 60%;
        margin: 0 auto;
    }
    @media screen and (max-width: 1024px){
        width: 80%;
        margin: 0 auto;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
        margin: 0 auto;
    }
    @media screen and (max-width: 480px) {
        width: 100%;
        margin: 0 auto;
    }
`;

const Total = styled.div`
    text-align: right;
`;

const BtnBuy = styled.button`
    padding: 5px 25px;
`;
