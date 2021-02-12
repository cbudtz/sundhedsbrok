import {Button, Carousel, Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import Jumbotron from "../components/jumbotron";
import Blockquote from "../components/Blockquote";
import {fetchAPI, postAPI} from "../lib/api";
import {Formik} from "formik";
import {useRouter} from "next/router";

function Home({broks}) {
    const carouselStyle={
        minHeight:300,
        backgroundColor:"#111111"
    }
    const slideStyle = {margin:"15%", color:"white"};

    const router =  useRouter();
    return (<>
        <Container>
            <Row>
                <Col md={{span: 6, offset:3}} style={{textAlign:"center", marginTop:-50, marginBottom:-50}}>
                <img align={"center"} src={"/sundhedsbrok.png"} alt={"Sundhedsbrok"}/>
                </Col>
            </Row>
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

            <Row>
                <Col md={{span:8,offset:2}}>
                    <i>
                        Her kan du komme af med dine frustrationer over sundhedsvæsenet. Måske bliver der gjort noget ved det - måske gør der ikke? Men du kom i det mindste af med det 😊.
                    </i>
                </Col>
            </Row>

        </Container>
        <Container >
            <Jumbotron>
                <Carousel style={carouselStyle} interval={10000} pause={"hover"}>
                    {broks.map((brok=>
                            <Carousel.Item key={brok.id}>
                                <div align={"center"} style={slideStyle}>
                                    <Blockquote citation={brok.name}>
                                        {brok.text}
                                    </Blockquote>
                                </div>
                            </Carousel.Item>
                    ))}


                </Carousel>
            </Jumbotron>
            <Container>
                <Row>
                    <Col md={{span: 6, offset:3}}>
                        <Formik
                            initialValues={{name:"",text:""}}
                            onSubmit={(values,{resetForm})=>{
                                console.log("Submitting")
                                resetForm({name:"",text:""});
                                postAPI("broks",values).then((data)=>
                                    router.replace(router.asPath)
                                )
                            }}
                        >{({values,
                               errors,
                               touched,
                               handleChange,
                               handleBlur,
                               handleSubmit,
                               isSubmitting})=>(
                            <Form>
                                <FormGroup>
                                    <Form.Label>Dit input</Form.Label>
                                    <Form.Control as={"textarea"} placeholder="Skriv dit input her"
                                                  onChange={handleChange} onBlur={handleBlur} value={values.text}
                                                  name={"text"}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Form.Label>Dit navn</Form.Label>
                                    <Form.Control placeholder={"Dit navn"}
                                                  onChange={handleChange} onBlur={handleBlur} value={values.name}
                                                  name={"name"}
                                    />
                                </FormGroup>
                                <Button onClick={handleSubmit}>
                                    Brok!
                                </Button>
                            </Form>
                        )
                        }
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </Container>
    </>)
}

export async function getServerSideProps() {
    try {
        let brok = fetchAPI("broks?_limit=20&_sort=created_at:desc");
        return {props: {broks: await brok}}
    } catch (e) {
        return {props:{broks:[]}}
    }
}

export default Home;
