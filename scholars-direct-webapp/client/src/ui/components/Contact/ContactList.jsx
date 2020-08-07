import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { QUERY_CONTACTS } from '../../../graphql/queries/contacts/contacts';
import Contact from './Contact';
import '../../styles/contact-list.css';
import NavigationBar from "../TutorLayout/NavigationBar";
import Sidebar from "../TutorLayout/Sidebar";

import '../../styles/contact-list.css';

/**
 * @class ContactList
 * @extends {React.PureComponent}
 */
class ContactList extends React.PureComponent {
    /**
     * @returns {undefined}
     */
    componentDidMount() {
        this.props.contacts.refetch();
    }
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <Sidebar>
                <div className="contact-list-container full-height">
                    <div className="contact-list">
                        {!this.props.contactData.length
                        && this.props.contacts.loading
                        }
                        {!this.props.contacts.loading
                        && !this.props.contactData.length
                        && (
                            <div className="no-contacts flex-column flex-center">
                                <span>
                                  No contacts yet
                                </span>
                            </div>
                        )
                        }
                        {this.props.contactData.map(props => (
                            <Contact key={props.id} {...props} />
                        ))}
                    </div>
                </div>
            </Sidebar>
        );
    }
}

ContactList.propTypes = {
    contacts: PropTypes.shape({
        refetch: PropTypes.func,
        loading: PropTypes.bool,
        data: PropTypes.arrayOf(PropTypes.shape()),
    }),
    contactData: PropTypes.arrayOf(PropTypes.shape()),
};

const mapStateToProps = (state, props) => {
    if (!props.contacts.data) return { contactData: [] };
    if (!state.contacts.query) return { contactData: props.contacts.data };
    console.log(props.contacts.data);
    const removeWhitespace = str => str.replace(/\s+/, '');
    const queryExp = new RegExp(removeWhitespace(state.contacts.query), 'i');
    return {
        contactData: props.contacts.data.filter(({ user }) => (
            queryExp.test(removeWhitespace(user.username))
            || queryExp.test(removeWhitespace(user.email))
        ))
    };
};

export default compose(
    graphql(
        QUERY_CONTACTS,
        { name: 'contacts' },
    ),
    connect(mapStateToProps),
)(ContactList);