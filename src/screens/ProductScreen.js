import React, { useState, useEffect } from 'react';
import { ListGroup, Row, Col, Image, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    };

    fetchProducts();
  }, []);
  console.log(product);
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating variant={product.rating} text={`${product.numReviews} 리뷰`} />
              </ListGroup.Item>
              <ListGroup.Item>가격: ${product.price}</ListGroup.Item>
              <ListGroup.Item>제품설명: ${product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>가격 : </Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>재고 상태 : </Col>
                    <Col>
                      <strong>{product.countInStock > 0 ? `재고있음(${product.countInStock}EA)` : '재고없음'}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                    장바구니에 담기
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Link>
    </>
  );
};

export default ProductScreen;
