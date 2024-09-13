import { keyCodes } from './constants/keys.js'
import * as buttons from './main.js'

export default function physicalKeyboard(event) {
    switch(event.keyCode) {
        case keyCodes.zeroKeyCode: 
            buttons.zero.click();
            break;
        case keyCodes.oneKeyCode: 
            buttons.one.click();
            break;    
        case keyCodes.twoKeyCode: 
            buttons.two.click();
            break;      
        case keyCodes.threeKeyCode: 
            buttons.three.click();
            break; 
        case keyCodes.fourKeyCode: 
            buttons.four.click();
            break; 
        case keyCodes.fiveKeyCode: 
            buttons.five.click();
            break; 
        case keyCodes.sixKeyCode: 
            buttons.six.click();
            break; 
        case keyCodes.sevenKeyCode: 
            buttons.seven.click();
            break; 
        case keyCodes.eightKeyCode: 
            buttons.eight.click();
            break; 
        case keyCodes.nineKeyCode: 
            buttons.nine.click();
            break; 
        case keyCodes.dotKeyCode: 
            buttons.dot.click();
            break; 
        case keyCodes.enterKeyCode: 
            buttons.equalBtn.click();
            break; 
        case keyCodes.minusKeyCode: 
            buttons.minus.click();
            break; 
        case keyCodes.plusKeyCode: 
            buttons.plus.click();
            break;
        case keyCodes.multiplicationKeyCode: 
            buttons.multiplication.click();
            break;
        case keyCodes.divisionKeyCode: 
            buttons.division.click();
            break;
        case keyCodes.remainderKeyCode: 
            buttons.remainder.click();
            break;
        case keyCodes.openingParenthesisKeyCode: 
            buttons.open.click();
            break;
        case keyCodes.closingParenthesisKeyCode: 
            buttons.close.click();
            break;
    }
}
