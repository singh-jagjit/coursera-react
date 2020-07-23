
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, 
    Button , Modal, ModalHeader, ModalBody,
    Row, Label, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

import { LoadingComponent } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
    
class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen : false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment );
        
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Comment-Form</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            
                            <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        
                                        />
                                        <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} 

                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>

                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment"
                                        className="form-control"
                                        rows="6"                                        
                                        >
                                        
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );

    }
}

function RenderDish({dish}){

        if (dish != null) {
            return (
                <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>

                </FadeTransform>
                
            )
        }
        else {
            return (<div></div>)
        }
}

function Rendercomments({comments, postComment, dishId}){

        const cmnts = comments.map( (Comment)=>{

            if(Comment != null){
                return(                
                    <li key={Comment.id}>
                        <Stagger in>
                        <Fade in>
                        <p>{Comment.comment}</p>
                        <p>-- {Comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            }).format(new Date(Comment.date))}
                        </p>
                        </Fade>
                        </Stagger>
                    </li>

                );                
            }
            else{
                return(
                    <div></div>
                );
            }
            
        });
        return(
            <div>
                {cmnts}                              
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
        
    }

const DishDetailComponent = (props) => {
    
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <LoadingComponent />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        const dish = props.dish;
        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem> 
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                    <div className="col-md-5">
                        <RenderDish dish = {props.dish}    />
                    </div>

                    <div className="col-md-5">
                        <ul>
                            <Rendercomments comments={props.comments} 
                            postComment={props.postComment}
                            dishId={props.dish.id}
                            />
                        </ul>
                        
                    </div>
                    </div>
                    <br></br>
                </div>
            </div>
        );
    
}

export default DishDetailComponent;

    