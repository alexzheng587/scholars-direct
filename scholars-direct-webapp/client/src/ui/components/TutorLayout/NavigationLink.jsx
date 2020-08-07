import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

//import '../../../styles/navlink.scss';

/**
 * @class NavigationLink
 * @extends {React.PureComponent}
 */
class NavigationLink extends React.PureComponent {
    /**
     * render
     * @returns {JSX.Element} HTML
     */
    render() {
        return (
            <Link
                to={this.props.to}
                className="display-flex justify-content-center"
                activeClassName="active"
            >
                <i className={`fa fa-${this.props.icon}`} />
                {Boolean(this.props.notifs) && (
                    <div className="notifs">
                        {this.props.notifs}
                    </div>
                )}
            </Link>
        );
    }
}

NavigationLink.propTypes = {
    to: PropTypes.string,
    icon: PropTypes.string,
    notifs: PropTypes.string,
};

export default NavigationLink;
