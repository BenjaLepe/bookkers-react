import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { postReportRoute } from '../../hooks/calls';
import errorMsg from '../../hooks/error';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        padding: '20px',
        borderRadius: '10px',
        width: '60%'
    },
    background: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 101,
        bottom: 0,
        display: 'flex',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    textarea: {
        width: '100%',
        margin: '10px 0 10px 0',
        fontFamily: `'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif'`,
    }
};

const initialValues = {
    comment: '',
}


function ReportModal(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [report, setReport] = React.useState(initialValues);
    const [errorMessage, setErrorMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setReport('');
        setIsOpen(false);
    }

    function handleChange(event) {
        setReport((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
          }));
        console.log(report);
    }

    async function reportReview() {
        try {
            const params = props;
            const message = report;
            await postReportRoute(params, message);
            setResponseMessage('Se ha creado el libro con éxito!')
            setIsOpen(false)
        }catch (err) {
            console.log(err);
            const message = errorMsg(err);
            setErrorMessage(message);
        }

    }

    return (
        <div>
            <button className="delete" onClick={openModal}>Report</button>
            { (modalIsOpen) ? (
            <div style={customStyles.background}>
                <div style={customStyles.content}>
                    <Formik
                        style={customStyles.content}
                        initialValues={report}
                        validationSchema={Yup.object({
                            comment: Yup.string()
                            .required('Please enter the comment of the review'),
                        })}
                        onSubmit={reportReview}
                        >
                    {({ errors, touched }) => (
                    <Form className='form-box-report'>
                        { (responseMessage && !errorMessage) ? (
                        <div className="response-message success">{ `${responseMessage}` }</div>
                        ): (errorMessage) ? (
                        <div className="response-message error">{ `${errorMessage}` }</div>
                        ): null }
                        <h2>Reportar review</h2>
                        <div className="form-group">
                        <label htmlFor="comment">¿Por qué estás reportando este review?</label>
                            <Field as="textarea" style={ customStyles.textarea } name="comment" onInput={handleChange} />
                            {errors.comment && touched.comment ? (
                            <div className="error-container">* {errors.comment}</div>
                            ) : null}
                        </div>
                        <div className="submit-container">
                        <button className="cancelar" onClick={closeModal}>Cancelar</button>
                        <button className="delete" type="submit">Report</button>
                        </div>
                    </Form>
                    )}
                </Formik>
                </div>
            </div>
            ):null}
        </div>
    );
}

export default ReportModal;