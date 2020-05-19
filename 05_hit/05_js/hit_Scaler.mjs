/**
 * @author Shauna Lynch <lynchbyte.com.au>
 */
import { scene } from '../hit_app.js';

export const worder = (function () {

    const holder = [0.01];

    return {
        get: function () {

            return holder[0];
        },

        set: function (val) {

            holder.pop();
 
            holder.push(val);

            console.log(`holder`, holder);

        },

        }
  
}());