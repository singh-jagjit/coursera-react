
import React , { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MenuComponent from './MenuComponent';
import DishDetailComponent from './DishDetailComponent';
import HeaderComponent from './HeaderComponent';
import FooterComponent  from './FooterComponent';
import HomeComponent from './HomeComponent';
import ContactComponent from './ContactComponent';
import AboutComponent from './AboutComponent';
import { ReactReduxContext } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreaters';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes:  () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},//form named as feedback
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: ( firstname, lastname, telnum, email, agree, contactType, message ) => {dispatch(postFeedback( firstname, lastname, telnum, email, agree, contactType, message ))}
});


class MainComponent extends Component{
    
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
      console.log(this.props.dishes);
      return(
        <HomeComponent dish= {this.props.dishes.dishes.filter((dish) => dish.featured )[0]} 
          dishesLoading= {this.props.dishes.isLoading}
          dishesErrMess= {this.props.dishes.errMess}
          promotion = {this.props.promotions.promotions.filter((promo) => promo.featured )[0]}
          promosLoading= {this.props.promotions.isLoading}
          promosErrMess= {this.props.promotions.errMess}
          leader = {this.props.leaders.leaders.filter((leader) => leader.featured )[0]}
          leadersLoading = {this.props.leaders.isLoading}
          leadersErrMess = {this.props.leaders.errMess}
        />
      )
    }
    const DishWithId = ({match}) => {
      return(
        <DishDetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.dishesLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comments) => comments.dishId === parseInt(match.params.dishId,10))}
          errMess={this.props.comments.errMess}          
          postComment={this.props.postComment}
        />
      );
    }

    const Contact = () => {
      return(
        <ContactComponent resetFeedbackForm={this.props.resetFeedbackForm} 
          postFeedback={this.props.postFeedback} />
        
      )
    }

    return(
      <div>
        <HeaderComponent />
        <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <MenuComponent dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route exact path="/contactus" component={Contact}  />
            <Route exact path="/aboutus" component={() => <AboutComponent leaders={this.props.leaders.leaders} />} />
            <Redirect to="/home" />
          </Switch>
          </CSSTransition>
        </TransitionGroup>
        <FooterComponent />
        

      </div>        
    );
      
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));

