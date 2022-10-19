import React from 'react';
import Tomato from '../images/tomato.png';
import Lettuce from '../images/lettuce.png';
import Apple from '../images/apple.png';
import Banana from '../images/banana.png';

function Soon (props){
    return (
        <div className = "expiring-item">
            <img src = {props.image} alt = "Item" className = "item-image"/> 
            <div className = "item-data">
                <h3 className = "item-title"> {props.item} </h3>
                <p> Amount Left: {props.amount} </p>
            </div>
            <div className = "item-timer">
                <p className = "soon-circle"> &#11044; </p> 
                <p> {props.time} </p>
            </div>
        </div>
    );
};

function Approaching (props){
    return (
        <div className = "approaching-item">
            <img src = {props.image} alt = "Item" className = "item-image"/> 
            <div className = "item-data">
                <h3 className = "item-title"> {props.item} </h3>
                <p> Amount Left: {props.amount} </p>
            </div>
            <div className = "item-timer">
                <p className = "approaching-triangle"> &#9652; </p>
                <p> {props.time} </p>
            </div>
        </div>
    );
};
  
function Home (){
    return (
        <div>
            <div>
                <Soon item="Lettuce" amount="3" time="1 day" image={Lettuce}/>
            </div>
            <div>
                <Soon item="Tomato" amount="2" time="3 days" image={Tomato}/>
            </div>
            <div>
                <Approaching item="Banana" amount="5" time="7 days" image={Banana}/>
            </div>
        </div>
    );
}
  
export default Home;