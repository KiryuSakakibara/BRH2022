import React , { useRef , useState }from 'react';
import Tomato from '../images/tomato.png';
import Lettuce from '../images/lettuce.png';
import Apple from '../images/apple.png';
import Banana from '../images/banana.png';
import Refresh from '../images/refresh.png';
  
function FullItems (props){
    return (
        <div className = "items">
            <img src = {props.image} alt = "Item" className = "item-image"/> 
            <div className = "item-data">
                <h3 className = "item-title"> {props.item} </h3>
                <p> Amount Left: {props.amount} </p>
            </div>
            <div className = "item-timer">
            <p className = "item-timer"> {props.time} </p>
            </div>
        </div>
    );
};

function Items (){
    const modal = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const handleClick = () => {
        setIsActive(current => !current);
    }
    const [showForm, setShowForm] = useState(false);
    const [isApple, setIsApple] = useState(false);
    const submitClick = (event) => {
        setIsApple(true);
        event.preventDefault();
        setShowForm(false);
    }
    return (
    <div> 
        <div className = "items-head">
            <div className="btn">
                <button className="js-btn" onClick={handleClick}>
                    <img src = {Refresh} alt = "Refresh" className = "refresh"/>
                </button>
            </div>
            <h1 className = "fridge-name"> Bob's Fridge </h1>
        </div>
        <div className="modal" ref = {modal} style={{display: isActive ? 'flex': 'none'}}>
            <div className="modal_content">
                <span className="close" onClick={handleClick}> &times;</span>
                <p> New Item In Fridge Detected !</p>
            </div>
        </div>
        <div>
        {showForm ? (
        <form>
            <label> Item Name: 
                <input type="text" name="Item Name" placeholder="Item Name" defaultValue="Apple"/>  
            </label>
            <label> Quantity of Item: 
                <input type="number" name="Quantity of Item" placeholder="Item Quantity" defaultValue="3"/> 
            </label>
            <label> Days Until Expiration: 
                <input type="number" name="Expiration" placeholder="Expiration" defaultValue="9"/>
            </label>
            <input type="submit" value="Submit" className = "submit" onClick={submitClick}/>
        </form>
        ) : (
        <button onClick={() => setShowForm(true)} className = "addButton"> Add New Item </button>
        )}
    </div>
    {isApple ? (
        <FullItems item="Apple" amount="3" time="9 days" image={Apple}/>
    ) : (
        <p> </p>
    )}
    <FullItems item="Banana" amount="5" time="7 days" image={Banana}/>
    <FullItems item="Lettuce" amount="3" time="1 day" image={Lettuce}/>
    <FullItems item="Tomato" amount="2" time="3 days" image={Tomato}/>
    </div>
    );
};
  
export default Items;