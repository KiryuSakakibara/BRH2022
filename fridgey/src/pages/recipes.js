import React, { useState } from 'react';
import Carousel, {CarouselItem} from "../components/Carousel";
import '../App.css'

function RecipeTitle(props){
    return(
        <p className = "recipe-titles"> {props.name} </p>
    );
};

function SaladIngredients(){
    return (
        <ul className = "ingredients"> 
            <li> 1 large tomato </li>
            <li> 2 handfuls lettuce </li>    
            <li> 2 tablespoons mayonnaise </li>
            <li> 1 tablespoon lemon juice </li> 
            <li> 4 grindings of sea salt </li>
            <li> 3 grindings of pepper </li>
            <li> 1/2 teaspoon sugar</li>
        </ul>
    );
};

function SaladSteps(){
    return (
        <ol className = "steps"> 
            <li> Tear up the lettuce and place in a serving <br /> bowl. 
            Cut the tomato in half lengthwise, <br />  and then cut the halves 
            using a "W" cut to <br /> create about 1-inch wedges. 
            Add to the <br /> bowl. </li>
            <li> Mix together the mayo, lemon juice, salt <br /> and pepper and sugar.
            Add to the lettuce  <br /> and tomato, and blend softly but  <br /> thoroughly. 
            Serve with corn on the cob,  <br /> simple shellfish dishes, 
            and other summery  <br /> food. </li>
        </ol>
    );
};

function ChickenIngredients(){
    return (
        <ul className = "ingredients"> 
            <li> 8 chicken thighs </li>
            <li> 2 tomatoes, quartered </li>    
            <li> 8 cloves garlic, minced </li>
            <li> 4 teaspoons minced fresh ginger root </li> 
            <li> 1 teaspoon chili powder </li>
            <li>1 pinch ground turmeric </li>
            <li> ½ teaspoon coconut oil </li>
        </ul>
    );
};

function ChickenSteps(){
    return (
        <ol className = "steps"> 
            <li> Combine the chicken, tomatoes, garlic,  <br /> ginger, chili powder, and turmeric
            in a large,  <br />  heavy pot over high heat; cook and stir  <br /> until the chicken begins to brown. </li>
            <li> Reduce heat to medium-low and allow  <br /> mixture to simmer until the chicken is no  <br />
            longer pink in the center and the juices run  <br /> clear, about 45 minutes. </li>
            <li> Sprinkle with coconut oil to serve. </li>
        </ol>
    );
};

function PieIngredients(){
    return (
        <ul className = "ingredients"> 
            <li> 1 (9 inch) deep dish pie crust </li>
            <li> 2 large tomatoes, peeled and sliced </li>    
            <li> ½ cup chopped fresh basil </li>
            <li> 3 green onions, thinly sliced </li> 
            <li> ½ pound bacon  </li>
            <li> ½ teaspoon garlic powder </li>
            <li> 1 teaspoon dried oregano </li>
            <li> 2 cups shredded Cheddar cheese </li>
            <li> ¼ cup mayonnaise </li>
        </ul>
    );
};

function PieSteps(){
    return (
        <ol className = "steps"> 
            <li> Preheat oven to 375 degrees F (190  <br /> degrees C). </li>
            <li> In alternating layers, fill pastry shell with  <br /> tomatoes, basil,
            scallions, bacon, garlic  <br /> powder, oregano, and red pepper. In a  <br /> small 
            bowl, mix cheese with mayonnaise.  <br /> Spread mixture over top of pie. 
            </li>
            <li> Bake in preheated oven for 30 minutes.  <br />  Serve warm or cold. </li>
        </ol>
    );
};
  
function SaladRecipe(){
    return (
        <div> 
            <p className = "recipe-titles"> Ingredients: </p>
            <SaladIngredients/> 
            <p className = "recipe-titles"> Steps: </p>
            <SaladSteps />
        </div>
    );
};

function ChickenRecipe(){
    return (
        <div> 
            <p className = "recipe-titles"> Ingredients: </p>
            <ChickenIngredients/> 
            <p className = "recipe-titles"> Steps: </p>
            <ChickenSteps />
        </div>
    );
};

function PieRecipe(){
    return (
        <div> 
            <p className = "recipe-titles"> Ingredients: </p>
            <PieIngredients/> 
            <p className = "recipe-titles"> Steps: </p>
            <PieSteps />
        </div>
    );
};

function Recipes (){
    return (
        <div className = "recipe-box">
            <h1> Recommended Recipes </h1>
            <Carousel>  
                <CarouselItem width={"100%"}> 
                    <div>
                        <RecipeTitle name = "Lettuce and Tomato Salad" />
                        <SaladRecipe />
                    </div>
                </CarouselItem>
                <CarouselItem> 
                    <RecipeTitle name = "Tomato Chicken" />
                    <ChickenRecipe />
                </CarouselItem> 
                <CarouselItem>
                    <RecipeTitle name = "Tomato Pie" />
                    <PieRecipe />
                </CarouselItem>
            </Carousel>
        </div>
    );
};
  
export default Recipes;