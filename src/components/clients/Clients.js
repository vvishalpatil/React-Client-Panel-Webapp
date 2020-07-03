import React,{Component} from 'react'
import '../styleApp.css';
import { Link } from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import '../styleApp.css';


class Clients extends Component{
	state={
		totalOwed:null
	}

	static getDerivedStateFromProps(props,state){
		const {clients}=props;

		if(clients){
			const total=clients.reduce((total,client)=>{
				return total+parseFloat(client.balance.toString());
			},0);
			return{totalOwed:total}
		}
		return null;
	}

	render(){
		const {clients}=this.props;
		const {totalOwed}=this.state;
		if(clients){
			return(
				<div>
					<div className="row">
						<div className="col-md-6">
							<h2 id="clientHeader">
							<i className="fa fa-users"></i>
							{' '}Clients </h2>
						</div>
						<div className='col-md-6'>
							<h5 className='text-right text-secondary'>
							 <span className='text' id='moneyOwed'>
							 	Total owed {' '} </span>
							 	<span className='text-primary' id='moneyOwed'>Rs. {parseFloat(totalOwed).toFixed(2)}
							 </span>
							 </h5>
						</div>
					</div>
					<br/><br/>
					<table className='table table-striped table-borderless'>
						<thead className='thead'>
							<tr>
								<th>Name</th>
								<th>Email</th>
								
								<th>Balance</th>
								<th></th>							
							</tr>
							</thead>
							<tbody>
								{clients.map(client=>(
									<tr key={client.id}>
										<td>{client.firstName} {client.lastName}</td>
										<td>{client.email}</td>
										
										<td>Rs. {parseFloat(client.balance).toFixed(2)}</td>
										<td>
											<Link to={`/client/${client.id}`} className='btn btn-secondary btn-sm'>
											<i className='fa fa-arrow-circle-right'></i>{' '}Details
											</Link>
										</td>
									</tr>
								))}
							</tbody>
					</table>
				</div>
			);
		}
		else{
			return <Spinner />
		}		
		
			
	}
}

Clients.propTypes={
	firestore:PropTypes.object.isRequired,
	clients:PropTypes.array
}

export default compose(firestoreConnect([{collection:'user'}]),
	connect((state,props)=>({
		clients:state.firestore.ordered.user
	}))
)(Clients);