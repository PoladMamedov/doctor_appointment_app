import { noItem, ul } from './constants.js';

export default function checkCards() {
    if (ul.children.length === 0) {
       noItem.style.display = 'block';
    } else {
       noItem.style.display = 'none';
    }
 }