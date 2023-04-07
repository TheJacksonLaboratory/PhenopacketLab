import { Disease } from 'src/app/models/disease';

import { Utils } from './utils';


describe('Utils', () => {


    it('Should create a unique key in Array provided by finding the biggest key and incrementing it by 1', () => {
        let array = [];
        const obj1 = new Disease();
        obj1.key = Utils.getBiggestKey(array) + 1;
        array.push(obj1);
        expect(obj1.key === 1).toBeTruthy();

        const obj2 = new Disease();
        obj2.key = Utils.getBiggestKey(array) + 1;
        array.push(obj2);
        expect(obj2.key === 2).toBeTruthy();

        // remove obj2
        array = array.filter(val => val.key !== obj2.key);
        const biggestKey = Utils.getBiggestKey(array);
        expect(biggestKey === 1).toBeTruthy();

        // add new obj
        const obj3 = new Disease();
        obj3.key = Utils.getBiggestKey(array) + 1;
        array.push(obj3);
        expect(obj3.key === 2).toBeTruthy();
    });


});

