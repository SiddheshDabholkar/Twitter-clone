class FloatingMenuItem extends React.Component {
  handleClick() {
    this.props.action();
  }

  render() {
    let buttonStyle = {
      backgroundImage: `url(${this.props.icon})`,
    };

    let label;

    if (this.props.label) {
      label = <label>{this.props.label}</label>;
    }

    return (
      <div onClick={this.handleClick.bind(this)} className="floating-menu-item">
        {label}
        <div className="floating-menu-icon">
          <i className="material-icons">{this.props.icon}</i>
        </div>
      </div>
    );
  }
}

class FloatingMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      toggled: false,
    };
  }

  toggleMenu() {
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    let buttons = [];
    let className = "floating-menu";
    let icon = "add";

    if (this.state.toggled) {
      className += " open";
      icon = "clear";
      buttons.push(
        <FloatingMenuItem label="Item 1" icon="create" action="" key="i1" />
      );
      buttons.push(
        <FloatingMenuItem label="Item 2" icon="drafts" action="" key="i2" />
      );
    }

    buttons.push(
      <FloatingMenuItem
        label=""
        icon={icon}
        action={this.toggleMenu.bind(this)}
        key="m"
      />
    );

    return (
      <div className="container">
        <div className={className}>{buttons}</div>
      </div>
    );
  }
}

ReactDOM.render(<FloatingMenu />, document.getElementById("app"));
