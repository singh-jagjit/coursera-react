import React , { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

import MenuComponent from './MenuComponent';
import DishDetailComponent from './DishDetailComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent  from './FooterComponent';
import HomeComponent from './HomeComponent';
import ContactComponent from './ContactComponent';
import AboutComponent from './AboutComponent';

class MainComponent extends Component{
    
  constructor(props) {
    super(props);

    this.state = {
      dishes : DISHES,
      comments : COMMENTS,
      promotions : PROMOTIONS,
      leaders : LEADERS
    };
  }

  render() {

    const HomePage = () => {
      return(
        <HomeComponent dish={this.state.dishes.filter((dish) => dish.featured )[0]} 
          promotion = {this.state.promotions.filter((promo) => promo.featured )[0]}
          leader = {this.state.leaders.filter((leader) => leader.featured )[0]}
        />
      )
    }
    const DishWithId = ({match}) => {
      return(
        <DishDetailComponent dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          comments={this.state.comments.filter((comments) => comments.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }

    return(
      <div>
        <HeaderComponent />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <MenuComponent dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={ContactComponent} />
          <Route exact path="/aboutus" component={() => <AboutComponent leaders={this.state.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        
        <FooterComponent />
        

      </div>        
    );
      
  }

}

export default MainComponent;

