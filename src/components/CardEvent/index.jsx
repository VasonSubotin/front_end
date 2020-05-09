import React from 'react';
import propTypes from 'prop-types';

import s from './styles.module.scss';

export default class CardEvent extends React.PureComponent {
    static propTypes = {
        id: propTypes.string.isRequired,
        dateTime: propTypes.string.isRequired,
        summary: propTypes.string.isRequired,
        location: propTypes.string.isRequired,
    }

    render() {
        return (
            <div className={s.container}>
                <p><b>When </b>{this.props.dateTime}</p>
                <p><b>Summary </b>{this.props.summary}</p>
                <p><b>Location </b>{this.props.location}</p>
            </div>
        );
    }
}