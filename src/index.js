// import _ from 'lodash';
// import { cube } from './math.js';
// import './style.css';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}


// function component() {
//     const element = document.createElement('pre');

//     element.innerHTML = [
//         'Hello webpack5!',
//         '5 cubed is equal to ' + cube(5)
//     ].join('\n\n');

//     return element;
// }

// document.body.appendChild(component());

import './styles/index.scss' 
class Hello { 
    name = 'Webpack5' 
} 
const hello = new Hello() 

const p = document.createElement('p') 
p.textContent = `I like ${hello.name}.` 

const heading = document.createElement('h1') 
heading.textContent = 'Hello!' 

const app = document.querySelector('#app') 
app.append(heading, p) 