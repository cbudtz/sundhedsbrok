import {Button, Carousel, Col, Container, Form, FormGroup, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import Jumbotron from "../components/jumbotron";
import Blockquote from "../components/Blockquote";
import {fetchAPI, postAPI} from "../lib/api";
import {Formik} from "formik";
import {useRouter} from "next/router";
import Head from "next/head";

function Home({broks}) {
    const carouselStyle={
        minHeight:300,
        backgroundColor:"#111111"
    }
    const slideStyle = {margin:"15%", color:"white"};

    const router =  useRouter();
    return (<>
        <Head>
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
            <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/manifest.json"/>
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
            <meta name="theme-color" content="#ffffff"/>

        </Head>
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
