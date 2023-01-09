import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyClose);
  }

  handleKeyClose = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseOnBacdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className="Overlay" onClick={this.handleCloseOnBacdropClick}>
        <div className="Modal">
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
