import React from 'react';

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';

import { LoadingComponent } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}){
    if (isLoading) {
        return(
                <LoadingComponent />
        );
    }
    else if (errMess) {
        return(
                <h4>{errMess}</h4>
        );
    }
    else {
        //with image we use baseUrl because if the server is reloaded then it may fail to retrive the path which is why we serve it from the server. 27:00 Week 4 Fetch from server.
        return(
            <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> :null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }

}

function HomeComponent(props){

    //console.log(props);
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                    isLoading={props.dishesLoading} 
                    errMess={props.dishesErrMess}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} 
                    isLoading={props.promosLoading} 
                    errMess={props.promosErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} 
                    isLoading={props.leadersLoading}
                    errMess={props.leadersErrMess}/>
                </div>
            </div>                       
        </div>
    );
}



export default HomeComponent;
