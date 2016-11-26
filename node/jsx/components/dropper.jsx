class Dropper extends React.Component {
    render() {
        var rows = [];
        this.props.list.forEach(function(item) {
            rows.push(<option value={item.id} key={item.id}>{item.name}</option>);
        });
        return (
            <div className='question'>
                <span className="title">{this.props.title}: </span>
                <select onChange={this.props.handler} defaultValue={this.props.default}>
                    {rows}
                </select>
            </div>
        );
    }
}