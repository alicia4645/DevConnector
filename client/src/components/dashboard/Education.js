import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'


const Education = ({ education, deleteEducation }) => {

    const educations = education.map( edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td className='hide-sm'>
                {new Date(edu.from).toLocaleDateString('en-GB')} -{' '}
                {
                    edu.to === null ? (' Now') : new Date(edu.to).toLocaleDateString('en-GB')
                }
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>Delete</button>
            </td>
        </tr>
    ))

  return (
    <>
        <h2 className='my-2'>Education Credentials</h2>
        <table>
            <thead>
                <tr>
                    <th>School</th>
                    <th className='hide-sm'>Degree</th>
                    <th className='hide-sm'>Years</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                { educations }
            </tbody>
        </table>
    </>
  )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)