import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education'
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading },
    deleteAccount
} )=> {
    useEffect(() => {
        getCurrentProfile();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return loading && profile === null ? <Spinner /> : <>
  <h1 className='large text-primary'> Dashboard </h1>
    <p className='lead'>
        <i className="fas fa-user"></i>
        Welcome {user && user.name}
    </p>
    { profile != null ? 
        <>
            <DashboardActions/>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className='my-2'>
                <button className='btn btn-danger' onClick={() => deleteAccount(profile._id)}>
                   <i className='fas fa-user'></i>
                    Delete My Account
                </button>
            </div>
        </>
    : 
        <>
            <p>You have not yet set up a profile. Please add some info.</p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
                Create profile
            </Link>
        </>
    }
  </>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

const matchDispatchToProps = {
    getCurrentProfile,
    deleteAccount
}
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);