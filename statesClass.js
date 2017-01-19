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

    get randomState(){
        return this.statesNames[Math.floor(Math.random() * this.statesNames.length)];
    }
}
module.exports = States;
/**
 * Created by HP on 1/19/2017.
 */
