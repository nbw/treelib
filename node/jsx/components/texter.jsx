class Texter extends React.Component {
    render() {
        return (
            <div id={this.props.id} className='question'>
                <span className="title">{this.props.title}: </span>
                <textarea
                    value={this.props.text}
                    placeholder={this.props.placeholder}
                    onChange={this.props.handler}
                     />
            </div>
        );
    }
}