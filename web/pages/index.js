import {Button, Carousel, Row, Col, FormGroup, Container, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import Jumbotron from "../components/jumbotron";
import Blockquote from "../components/Blockquote";

export default function Home() {
    const carouselStyle={
        minHeight:300,
        backgroundColor:"#111111"
    }
    const slideStyle = {margin:"15%", color:"white"};
    return (<>
        <Container>
            <Row>
                <Col md={{span:4,offset:4}}>
                    <h5 align={"center"}>
                        <i>
                            Velkommen til:
                        </i>
                    </h5>
                </Col>
            </Row>
            <Row>
                <Col md={{span:4,offset:4}}>
                    <h2 align={"center"}>
                        Sundhedsbrok.dk
                    </h2>
                </Col>
            </Row>

        </Container>
        <Container >
            <Jumbotron>
                <Carousel style={carouselStyle} interval={10000} pause={"hover"}>
                    <Carousel.Item>
                        <div align={"center"} style={slideStyle}>
                            <Blockquote >
                                <h>
                                    The food sucks at Rigshospitalet!
                                </h>
                            </Blockquote>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div align={"center"} style={slideStyle}>
                            <Blockquote citation={"Some random dude"}>
                                The food sucks at Nykøbing Falster
                            </Blockquote>
                        </div>
                    </Carousel.Item>

                </Carousel>
            </Jumbotron>
            <Container>
                <Row>
                    <Col md={{span: 6, offset:3}}>
                        <Form>
                            <FormGroup>
                                <Form.Label>Dit input</Form.Label>
                                <Form.Control as={"textarea"} placeholder="Skiv dit input her"/>
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Dit navn</Form.Label>
                                <Form.Control placeholder={"Dit navn"}/>
                            </FormGroup>
                            <Button>
                                Brok!
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    </>)
}
