import React from 'react';
import ReactDOM from 'react-dom';

function AddItemForm(props) {
    const [item, setItem] = React.useState('');

    function handleChange(e) {
        setItem(e.target.value);
    }

    function handleSubmit(e) {
        props.handleSubmit(item);
        setItem('');
        e.preventDefault();
    }

    return <form onSubmit={handleSubmit}>
        <div class="form-group">
            <input className="form-control border border-dark" type="text" onChange={handleChange} value={item} placeholder="Add Item..." required />
        </div>
        <div class="form-group">
            <button className="btn btn-block btn-dark text-center" type="submit">Add</button>
        </div>
    </form>;
}

function ItemList(props) {
    const listItems = props.data.map((val) => <div className="clearfix">
        <li className="ml-n4 mt-2 pt-2">{val}
            <span id={val} className="text-danger float-right mt-1 material-icons" onClick={removeItem}>
                remove_circle_outline</span>
        </li>
    </div>);

    function removeItem(e) {
        props.data.splice(props.data.indexOf(e.currentTarget.id), 1);
        ReactDOM.render(
            <React.StrictMode>
                <ContactManager data={props.data} />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    return <ul>{listItems}</ul>;
}

function ContactManager(props) {
    const [items, setItems] = React.useState(props.data);

    function addItem(name) {
        setItems([...items, name]);
    }

    return (
        <div>
            <AddItemForm handleSubmit={addItem} />
            <ItemList data={items} />
        </div>
    );
}

export default ContactManager;
