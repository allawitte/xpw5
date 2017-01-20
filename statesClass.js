'use strict'
const states = require('./states');
class States {
    constructor(states){
        this._states = states
    }

    get statesNames(){
        var arr = [];
        for(var key in this._states) {
            arr.push(key);
        }
        return arr;
    }
    getState(state){
        return this._states[state];
    }

    get randomState(){
        return this.statesNames[Math.floor(Math.random() * this.statesNames.length)];
    }
    getBase(state){
        return this._states[state].base;
    }
    getStateTax(state, itemType){
        return this.getState(state)[itemType];
    }

    calcNoBasicTax(state, itemType){
        if (this.getStateTax(state, itemType) === ""){
            return 0
        }
        return this.getBase(state) + this.getStateTax(state, itemType);

    }
}
module.exports = States;
/**
 * Created by HP on 1/19/2017.
 */
