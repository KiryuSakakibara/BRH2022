import React, { useState } from 'react';

import "../App.css"

export const CarouselItem = ({children , width}) => {
    return (
        <div className="carousel-item" style={{ width: width,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '500px' }}> 
            {children}
        </div>
    );
};

const Carousel = ({children}) => {
    const [activeRecipe, setActiveRecipe] = useState(0);
    const updateRecipe = (newRecipe) => {
        if (newRecipe < 0){
            newRecipe = 0;
        } else if (newRecipe >= React.Children.count(children)){
            newRecipe = React.Children.count(children) - 1;
        }
        setActiveRecipe(newRecipe);
    };
    return (
        <div className = "carousel" style={{overflow: 'hidden'}}>
            <div className = "inner" style = {{transform: `translateX(-${activeRecipe * 100}%)` , whiteSpace: 'nowrap'}}> 
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {width: "100%" });
                })}
            </div>
            <div className = "arrows"> 
                <button onClick={() => {
                    updateRecipe(activeRecipe - 1);
                }}> Prev </button>
                <button onClick={() => {
                    updateRecipe(activeRecipe + 1);
                }}> Next </button>
            </div>
        </div>
    );
}

export default Carousel;