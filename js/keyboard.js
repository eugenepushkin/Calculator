import { keyCodes } from './constants/keys.js'
import { zero, one, two, three, four, five, six, seven, eight, nine, dot, equalBtn, minus, plus, multiplication, division, remainder, open, close } from './main.js'

export default function physicalKeyboard(event) {
    switch(event.keyCode) {
        case keyCodes.zeroKeyCode: 
            zero.click();
            break;
        case keyCodes.oneKeyCode: 
            one.click();
            break;    
        case keyCodes.twoKeyCode: 
            two.click();
            break;      
        case keyCodes.threeKeyCode: 
            three.click();
            break; 
        case keyCodes.fourKeyCode: 
            four.click();
            break; 
        case keyCodes.fiveKeyCode: 
            five.click();
            break; 
        case keyCodes.sixKeyCode: 
            six.click();
            break; 
        case keyCodes.sevenKeyCode: 
            seven.click();
            break; 
        case keyCodes.eightKeyCode: 
            eight.click();
            break; 
        case keyCodes.nineKeyCode: 
            nine.click();
            break; 
        case keyCodes.dotKeyCode: 
            dot.click();
            break; 
        case keyCodes.enterKeyCode: 
            equalBtn.click();
            break; 
        case keyCodes.minusKeyCode: 
            minus.click();
            break; 
        case keyCodes.plusKeyCode: 
            plus.click();
            break;
        case keyCodes.multiplicationKeyCode: 
            multiplication.click();
            break;
        case keyCodes.divisionKeyCode: 
            division.click();
            break;
        case keyCodes.remainderKeyCode: 
            remainder.click();
            break;
        case keyCodes.openingParenthesisKeyCode: 
            open.click();
            break;
        case keyCodes.closingParenthesisKeyCode: 
            close.click();
            break;
    }
}
