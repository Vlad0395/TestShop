import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-skeleton-loader';
import styled from 'styled-components';
import { getProducts, saveSum, DeleteProduct, saveNumbers } from '../actions/ProductActions';
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
            if (!this.state.prices.length) {
                let prices = this.props.products.map((product) => product.price)
                this.setState({
                    prices,
                })
            }
        }
    }

    static getDerivedStateFromProps(props, state) {

        let numbers = [];
        let prices = [];

        if (!state.numbers.length) {
            if (props.numbers.length) {
                numbers = props.numbers;
                prices = props.products.map((product, index) => product.price * numbers[index])
            }
            else if (props.products) {
                numbers = props.products.map((product, index) => 1)
            }
            return {
                ...state,
                numbers,
                prices,
            }
        } else return {
            ...state,
            numbers: state.numbers,
            prices: state.prices,
        };
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
    };

    handleNumbers = (numbers) => {
        this.props.dispatch(saveNumbers(numbers))
    }

    handleRemove = (id, index) => {
        this.props.dispatch(DeleteProduct(id))
        let numbers = [...this.state.numbers]
        let prices = [...this.state.prices]
        numbers.splice(index, 1)
        prices.splice(index, 1)
        this.setState({
            numbers,
            prices,
        })
    };

    CalculationsSum = () => {
        let prices = [...this.state.prices];
        let sum = 0;
        prices.forEach(price => { sum += price });
        return sum;
    };

    render() {

        const { products } = this.props;
        const { numbers, prices } = this.state;
        const { handleChange, handleMove, handleRemove } = this;
        const sum = this.CalculationsSum();

        return (
            <Container>
                {products ?
                    map(products, (product, index) => (
                        <CartItem
                            product={product}
                            index={index}
                            handleChange={handleChange}
                            handleMove={handleMove}
                            handleRemove={handleRemove}
                            numbers={numbers}
                            key={product.id}
                            prices={prices}
                        />
                    )) :
                    <CartItem />
                }
                <Total className='total'>
                    {products && <div className="sum">
                        <p>
                            {sum} €
                        </p>
                    </div> || <Skeleton width='140px' count={2} />}
                    <Link to="/shipping">
                        {products && <BtnBuy
                            sum={sum}
                            disabled={sum === 0}
                            onClick={
                                () => {
                                    this.handleBuy(sum);
                                    this.handleNumbers(this.state.numbers)
                                }
                            }
                        >
                            BUY
                    </BtnBuy>}
                    </Link>
                </Total>
            </Container>
        )
    }
};

const mapStateToProps = state => {
    const { products, numbers} = state.productReducer;
    return {
        products,
        numbers,
    }
};

export default connect(mapStateToProps)(Cart);

const Container = styled.div`
    width: 35%;
    margin: 0 auto;
    @media screen and (max-width: 1366px) {
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
